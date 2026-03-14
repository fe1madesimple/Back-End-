// src/modules/content/service/lesson.service.ts

import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import {
  LessonDetailResponse,
  ModuleListResponse,
  LessonMCQResponse,
  GetLessonEssayResponse,
  SubmitLessonEssayInput,
  SubmitLessonEssayResponse,
} from '../interface/lesson.interface';
import achievementsService from '@/modules/achievement/service/achievements.service';
import { gradeEssayWithClaude } from '@/modules/practise/service/practise.service';

class LessonService {
  // ─── Video & Time Tracking ────────────────────────────────────────────────

  async trackVideoProgress(
    userId: string,
    lessonId: string,
    currentTime: number,
    videoDuration?: number
  ) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, videoDuration: true, moduleId: true },
    });

    if (!lesson) throw new AppError('Lesson not found');
    if (videoDuration && videoDuration <= 0) throw new AppError('Invalid video duration');

    const duration = videoDuration || lesson.videoDuration;
    if (!duration) throw new AppError('Video duration not available');

    if (videoDuration && !lesson.videoDuration) {
      await prisma.lesson.update({
        where: { id: lessonId },
        data: { videoDuration },
      });
    }

    const lessonProgressPercent = Math.min(100, (currentTime / duration) * 100);
    const isCompleted = lessonProgressPercent >= 90;

    const existingProgress = await prisma.userLessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
      select: { videoWatchedSeconds: true, timeSpentSeconds: true },
    });

    const previousWatchedSeconds = existingProgress?.videoWatchedSeconds || 0;
    const timeDelta = Math.max(0, currentTime - previousWatchedSeconds);
    const newTimeSpent = (existingProgress?.timeSpentSeconds || 0) + timeDelta;

    const updatedProgress = await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        videoWatchedSeconds: currentTime,
        timeSpentSeconds: currentTime,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        lastAccessedAt: new Date(),
      },
      update: {
        videoWatchedSeconds: currentTime,
        timeSpentSeconds: newTimeSpent,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        lastAccessedAt: new Date(),
      },
    });

    await this.recalculateModuleProgress(userId, lesson.moduleId);
    return updatedProgress;
  }

  private async recalculateModuleProgress(userId: string, moduleId: string) {
    const lessons = await prisma.lesson.findMany({
      where: { moduleId, isPublished: true },
      include: { userProgress: { where: { userId } } },
      orderBy: { order: 'asc' },
    });

    const totalLessons = lessons.length;
    if (totalLessons === 0) return;

    const lessonWeight = 100 / totalLessons;
    let moduleProgressPercent = 0;
    let completedLessons = 0;

    for (const lesson of lessons) {
      const userProgress = lesson.userProgress[0];
      if (!userProgress) continue;

      if (userProgress.isCompleted) {
        moduleProgressPercent += lessonWeight;
        completedLessons++;
      } else if (lesson.videoDuration && lesson.videoDuration > 0) {
        const lessonProgressPercent = Math.min(
          100,
          (userProgress.videoWatchedSeconds / lesson.videoDuration) * 100
        );
        moduleProgressPercent += (lessonProgressPercent / 100) * lessonWeight;
      }
    }

    moduleProgressPercent = Math.round(moduleProgressPercent * 10) / 10;

    const status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' =
      completedLessons === totalLessons && totalLessons > 0
        ? 'COMPLETED'
        : moduleProgressPercent > 0
          ? 'IN_PROGRESS'
          : 'NOT_STARTED';

    await prisma.userModuleProgress.upsert({
      where: { userId_moduleId: { userId, moduleId } },
      create: {
        userId,
        moduleId,
        progressPercent: moduleProgressPercent,
        status,
        completedLessons,
        totalLessons,
        lastAccessedAt: new Date(),
      },
      update: {
        progressPercent: moduleProgressPercent,
        status,
        completedLessons,
        lastAccessedAt: new Date(),
      },
    });

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      select: { subjectId: true },
    });

    if (module) await this.recalculateSubjectProgress(userId, module.subjectId);

    achievementsService
      .checkAllAchievements(userId)
      .catch((err) => console.error('Achievement check failed:', err));
  }

  private async recalculateSubjectProgress(userId: string, subjectId: string) {
    const modules = await prisma.module.findMany({
      where: { subjectId, isPublished: true },
      include: { userProgress: { where: { userId } } },
    });

    const totalModules = modules.length;
    if (totalModules === 0) return;

    const moduleWeight = 100 / totalModules;
    let subjectProgressPercent = 0;
    let completedModules = 0;

    for (const module of modules) {
      const moduleProgress = module.userProgress[0];
      if (!moduleProgress) continue;
      subjectProgressPercent += (moduleProgress.progressPercent / 100) * moduleWeight;
      if (moduleProgress.status === 'COMPLETED') completedModules++;
    }

    subjectProgressPercent = Math.round(subjectProgressPercent * 10) / 10;

    const status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' =
      completedModules === totalModules && totalModules > 0
        ? 'COMPLETED'
        : subjectProgressPercent > 0
          ? 'IN_PROGRESS'
          : 'NOT_STARTED';

    const allLessons = await prisma.lesson.findMany({
      where: { module: { subjectId }, isPublished: true },
      include: { userProgress: { where: { userId } } },
    });

    const totalTimeSeconds = allLessons.reduce(
      (sum, lesson) => sum + (lesson.userProgress[0]?.timeSpentSeconds || 0),
      0
    );

    await prisma.userSubjectProgress.upsert({
      where: { userId_subjectId: { userId, subjectId } },
      create: { userId, subjectId, progressPercent: subjectProgressPercent, status, totalTimeSeconds, lastAccessedAt: new Date() },
      update: { progressPercent: subjectProgressPercent, status, totalTimeSeconds, lastAccessedAt: new Date() },
    });
  }

  async trackTimeSpent(userId: string, lessonId: string, seconds: number) {
    await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: { userId, lessonId, timeSpentSeconds: seconds },
      update: { timeSpentSeconds: { increment: seconds } },
    });

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    });

    if (lesson) {
      await prisma.userSubjectProgress.upsert({
        where: { userId_subjectId: { userId, subjectId: lesson.module.subjectId } },
        create: { userId, subjectId: lesson.module.subjectId, totalTimeSeconds: seconds },
        update: { totalTimeSeconds: { increment: seconds } },
      });
    }
  }

  // ─── getLessonById ────────────────────────────────────────────────────────

  async getLessonById(userId: string, lessonId: string): Promise<LessonDetailResponse> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      include: {
        module: {
          include: {
            subject: { select: { id: true, name: true } },
          },
        },
        userProgress: { where: { userId } },
      },
    });

    if (!lesson) throw new AppError('Lesson not found');

    const userProgress = lesson.userProgress[0];

    if (userProgress) {
      await prisma.userLessonProgress.update({
        where: { id: userProgress.id },
        data: { lastAccessedAt: new Date() },
      });
    } else {
      await prisma.userLessonProgress.create({
        data: {
          userId,
          lessonId,
          videoWatchedSeconds: 0,
          timeSpentSeconds: 0,
          isCompleted: false,
          lastAccessedAt: new Date(),
        },
      });
    }

    const allModules = await prisma.module.findMany({
      where: { subjectId: lesson.module.subjectId, isPublished: true },
      include: {
        lessons: {
          where: { isPublished: true },
          select: { id: true, title: true, order: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug ?? null,
      content: lesson.content || null,
      videoUrl: lesson.videoUrl,
      videoDuration: lesson.videoDuration,
      transcript: lesson.transcript,
      order: lesson.order,
      module: {
        id: lesson.module.id,
        name: lesson.module.name,
        subjectId: lesson.module.subjectId,
        subjectName: lesson.module.subject.name,
      },
      userProgress: userProgress
        ? {
            isCompleted: userProgress.isCompleted,
            videoWatchedSeconds: userProgress.videoWatchedSeconds,
            timeSpentSeconds: userProgress.timeSpentSeconds,
            lastAccessedAt: userProgress.lastAccessedAt || null,
          }
        : null,
      subjectModules: allModules.map((module) => ({
        id: module.id,
        name: module.name,
        order: module.order,
        lessons: module.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          order: l.order,
        })),
      })),
    };
  }

  // ─── getModulesBySubject ──────────────────────────────────────────────────

  async getModulesBySubject(userId: string, subjectId: string): Promise<ModuleListResponse> {
    const modules = await prisma.module.findMany({
      where: { subjectId, isPublished: true },
      include: {
        lessons: {
          where: { isPublished: true },
          select: { id: true, title: true, order: true },
          orderBy: { order: 'asc' },
        },
        userProgress: { where: { userId } },
      },
      orderBy: { order: 'asc' },
    });

    return {
      modules: modules.map((module) => {
        const userProgress = module.userProgress[0];
        const totalLessons = module.lessons.length;
        const completedLessons = userProgress?.completedLessons || 0;

        let status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' = 'NOT_STARTED';
        if (completedLessons === totalLessons && totalLessons > 0) {
          status = 'COMPLETED';
        } else if (completedLessons > 0) {
          status = 'IN_PROGRESS';
        }

        return {
          id: module.id,
          name: module.name,
          slug: module.slug ?? null,
          order: module.order,
          status,
          progress: { completedLessons, totalLessons },
          lessons: module.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.order,
          })),
        };
      }),
    };
  }

  // ─── GET 7 MCQs for a lesson ──────────────────────────────────────────────

  async getLessonMCQs(userId: string, lessonId: string): Promise<LessonMCQResponse> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      select: { id: true, title: true },
    });

    if (!lesson) throw new AppError('Lesson not found');

    const allMCQs = await prisma.question.findMany({
      where: { lessonId, type: 'MCQ', isPublished: true },
      select: { id: true, text: true, options: true, points: true },
    });

    if (allMCQs.length === 0) {
      throw new AppError('No MCQ questions available for this lesson');
    }

    const selected = allMCQs.sort(() => Math.random() - 0.5).slice(0, 7);

    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      questions: selected.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options as Record<string, string>,
        points: q.points,
      })),
    };
  }

  // ─── GET random essay question for lesson practice ────────────────────────
  // Source: EssayQuestion model (the 747-question bank).
  // Priority 1: questions linked directly to this lesson.
  // Priority 2: any question from the same subject.

  async getLessonEssayQuestion(
    userId: string,
    lessonId: string
  ): Promise<GetLessonEssayResponse> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      select: {
        id: true,
        title: true,
        order: true,
        module: {
          select: {
            id: true,
            name: true,
            order: true,
            subjectId: true,
            subject: { select: { name: true } },
          },
        },
      },
    });

    if (!lesson) throw new AppError('Lesson not found');

    // Priority 1: EssayQuestions directly linked to this lesson
    let essays = await prisma.essayQuestion.findMany({
      where: { lessonId, isPublished: true },
      select: { id: true, text: true, subject: true },
    });

    // Priority 2: any EssayQuestion from the same subject
    if (essays.length === 0) {
      essays = await prisma.essayQuestion.findMany({
        where: {
          isPublished: true,
          subject: lesson.module.subject.name,
        },
        select: { id: true, text: true, subject: true },
      });
    }

    if (essays.length === 0) {
      throw new AppError('No essay questions available for this lesson');
    }

    const question = essays[Math.floor(Math.random() * essays.length)]!;

    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      subject: lesson.module.subject.name,
      moduleOrder: lesson.module.order,
      moduleName: lesson.module.name,
      lessonOrder: lesson.order,
      question: {
        id: question.id,
        text: question.text,
        subject: question.subject,
      },
    };
  }

  // ─── SUBMIT single lesson essay ───────────────────────────────────────────
  // Grades with Claude AI → saves EssayAttempt (source='LESSON_PRACTICE').
  // Returns the COMPLETE review data in one response — no follow-up call needed.
  // The frontend renders the review screen directly from this response.

  async submitLessonEssay(
    userId: string,
    input: SubmitLessonEssayInput
  ): Promise<SubmitLessonEssayResponse> {
    const { lessonId, essayQuestionId, answerText } = input;

    if (!answerText || answerText.trim().split(/\s+/).length < 20) {
      throw new AppError('Answer is too short to grade');
    }

    const [lesson, essayQuestion] = await Promise.all([
      prisma.lesson.findUnique({
        where: { id: lessonId, isPublished: true },
        select: { id: true, title: true },
      }),
      prisma.essayQuestion.findUnique({
        where: { id: essayQuestionId },
        select: { id: true, text: true, subject: true },
      }),
    ]);

    if (!lesson) throw new AppError('Lesson not found');
    if (!essayQuestion) throw new AppError('Essay question not found');

    const startedAt = Date.now();

    const grading = await gradeEssayWithClaude(
      answerText,
      essayQuestion.text,
      essayQuestion.subject
    );

    const timeTakenSeconds = Math.floor((Date.now() - startedAt) / 1000);
    const wordCount = answerText.trim().split(/\s+/).length;
    const aiScore20 = Math.round((grading.score / 100) * 20);

    // Save EssayAttempt — this is the history record
    const attempt = await prisma.essayAttempt.create({
      data: {
        userId,
        essayQuestionId,
        answerText,
        timeTakenSeconds,
        wordCount,
        aiScore: grading.score,
        band: grading.band,
        appPass: grading.score >= 80,
        feedback: grading.feedback,
        strengths: grading.strengths,
        improvements: grading.improvements,
        sampleAnswer: grading.sampleAnswer,
        provider: 'anthropic',
        model: 'claude-sonnet-4-20250514',
        tokensUsed: grading.tokensUsed,
        source: 'LESSON_PRACTICE',
        simulationId: null,
      } as any,
      select: { id: true },
    });

    // Return everything the review screen needs — in one shot
    return {
      attemptId: attempt.id,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      question: {
        id: essayQuestion.id,
        text: essayQuestion.text,
        subject: essayQuestion.subject,
      },
      userAnswer: answerText,
      aiScore: aiScore20,
      scoreOutOf: 20,
      band: grading.band,
      appPass: grading.score >= 80,
      passed: grading.score >= 50,
      feedback: grading.feedback,
      strengths: grading.strengths,
      improvements: grading.improvements,
      sampleAnswer: grading.sampleAnswer,
      timeTakenSeconds,
      wordCount,
    };
  }

  // ─── GET all MCQs for a lesson (full list, no cap) ────────────────────────
  // Used for admin/debug or if frontend needs the complete set.

  async getAllLessonMCQs(userId: string, lessonId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      select: { id: true, title: true },
    });

    if (!lesson) throw new AppError('Lesson not found');

    const questions = await prisma.question.findMany({
      where: { lessonId, type: 'MCQ', isPublished: true },
      select: { id: true, text: true, options: true, points: true, correctAnswer: true, explanation: true },
      orderBy: { order: 'asc' },
    });

    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      total: questions.length,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options as Record<string, string>,
        points: q.points,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      })),
    };
  }

  // ─── GET all essay questions for a lesson (full list) ────────────────────
  // Returns all EssayQuestions linked to this lesson from the bank.

  async getAllLessonEssayQuestions(userId: string, lessonId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      select: {
        id: true,
        title: true,
        module: { select: { subject: { select: { name: true } } } },
      },
    });

    if (!lesson) throw new AppError('Lesson not found');

    const questions = await prisma.essayQuestion.findMany({
      where: { lessonId, isPublished: true },
      select: { id: true, text: true, subject: true },
      orderBy: { createdAt: 'asc' },
    });

    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      subject: lesson.module.subject.name,
      total: questions.length,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        subject: q.subject,
      })),
    };
  }
}

export default new LessonService();