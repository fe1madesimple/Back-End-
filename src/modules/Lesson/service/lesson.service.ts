// src/modules/content/service/lesson.service.ts

import { prisma } from '@/shared/config';
import { AppError } from '@/shared/utils';
import {
  LessonDetailResponse,
  ModuleListResponse,
  LessonMCQResponse,
  MCQAttemptInput,
  MCQAttemptResponse,
  QuizResultsResponse,
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
      create: {
        userId,
        subjectId,
        progressPercent: subjectProgressPercent,
        status,
        totalTimeSeconds,
        lastAccessedAt: new Date(),
      },
      update: {
        progressPercent: subjectProgressPercent,
        status,
        totalTimeSeconds,
        lastAccessedAt: new Date(),
      },
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

  // ─── getLessonMCQs ────────────────────────────────────────────────────────
  // Creates QuizSession immediately — returns sessionId + questions.
  // correctAnswer NOT exposed here, only revealed after submit in attemptMCQ.

  async getLessonMCQs(userId: string, lessonId: string): Promise<any> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      select: {
        id: true,
        title: true,
        moduleId: true,
        module: {
          select: {
            subject: { select: { name: true } },
          },
        },
      },
    });

    if (!lesson) throw new AppError('Lesson not found');

    const allMCQs = await prisma.question.findMany({
      where: { lessonId, type: 'MCQ', isPublished: true },
      select: { id: true, text: true, options: true, points: true },
    });

    if (allMCQs.length === 0) {
      throw new AppError('No MCQ questions available for this lesson');
    }

    // Shuffle and cap at 7 — order locked into session
    const selected = allMCQs.sort(() => Math.random() - 0.5).slice(0, 7);
    const totalQuestions = selected.length;

    // Create session — questionIds stored in order, backend resolves from here on
    const session = await prisma.quizSession.create({
      data: {
        userId,
        quizType: 'LESSON_MCQ',
        totalQuestions,
        lessonId: lesson.id,
        moduleId: lesson.moduleId,
        questionsAnswered: 0,
        correctAnswers: 0,
        totalTimeSeconds: 0,
        isCompleted: false,
        questionIds: selected.map((q) => q.id),
      },
    });

    // Return ONLY the first question
    const firstQuestion = selected[0]!;

    return {
      sessionId: session.id,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      subject: lesson.module.subject.name,
      totalQuestions,
      currentQuestion: 1,
      isLast: totalQuestions === 1,
      question: {
        id: firstQuestion.id,
        text: firstQuestion.text,
        options: firstQuestion.options as Record<string, string>,
        points: firstQuestion.points,
      },
    };
  }

  async getNextQuestion(
    userId: string,
    sessionId: string,
    index: number 
  ): Promise<any> {
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        userId: true,
        totalQuestions: true,
        questionIds: true,
        isCompleted: true,
        lessonId: true,
        moduleId: true,
      },
    });

    if (!session || session.userId !== userId) {
      throw new AppError('Quiz session not found');
    }
    if (session.isCompleted) {
      throw new AppError('This quiz session is already completed');
    }
    if (index < 0 || index >= session.totalQuestions) {
      throw new AppError(`Invalid question index: ${index}`);
    }

    const questionId = session.questionIds[index];
    if (!questionId) throw new AppError('Question not found at this index');

    const question = await prisma.question.findUnique({
      where: { id: questionId, type: 'MCQ' },
      select: { id: true, text: true, options: true, points: true },
    });

    if (!question) throw new AppError('Question not found');

    // Fetch subject name for display
    let subject = 'Unknown';
    if (session.lessonId) {
      const lesson = await prisma.lesson.findUnique({
        where: { id: session.lessonId },
        select: { module: { select: { subject: { select: { name: true } } } } },
      });
      subject = lesson?.module?.subject?.name ?? 'Unknown';
    }

    const currentQuestion = index + 1; // 1-based for display
    const isLast = currentQuestion === session.totalQuestions;

    return {
      sessionId: session.id,
      subject,
      totalQuestions: session.totalQuestions,
      currentQuestion, 
      isLast, 
      question: {
        id: question.id,
        text: question.text,
        options: question.options as Record<string, string>,
        points: question.points,
      },
    };
  }

  // ─── attemptMCQ ───────────────────────────────────────────────────────────
  // Frontend sends: { sessionId, answer, timeTakenSeconds } — NO questionId.
  // Current question resolved via session.questionIds[questionsAnswered].
  // Returns isLastQuestion so frontend knows when to show "View Results".

  async attemptMCQ(userId: string, input: MCQAttemptInput): Promise<MCQAttemptResponse> {
    const { sessionId, answer, timeTakenSeconds } = input;

    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        userId: true,
        totalQuestions: true,
        questionsAnswered: true,
        isCompleted: true,
        questionIds: true,
      },
    });

    if (!session || session.userId !== userId) {
      throw new AppError('Quiz session not found');
    }
    if (session.isCompleted) {
      throw new AppError('This quiz session is already completed');
    }
    if (session.questionsAnswered >= session.totalQuestions) {
      throw new AppError('All questions in this session have been answered');
    }

    // Resolve current question from index — no frontend lookup needed
    const currentIndex = session.questionsAnswered;
    const questionId = session.questionIds[currentIndex];
    if (!questionId) throw new AppError('Could not resolve question for this session');

    const question = await prisma.question.findUnique({
      where: { id: questionId, type: 'MCQ' },
      select: { id: true, correctAnswer: true, explanation: true, points: true },
    });

    if (!question) throw new AppError('Question not found');

    const skipped = !answer || answer.trim() === '';
    const isCorrect = skipped
      ? false
      : answer.toUpperCase() === (question.correctAnswer ?? '').toUpperCase();
    const pointsEarned = isCorrect ? question.points : 0;

    const attempt = await prisma.questionAttempt.create({
      data: {
        userId,
        questionId,
        quizSessionId: sessionId,
        answer: skipped ? 'SKIPPED' : answer.toUpperCase(),
        isCorrect,
        pointsEarned,
        timeTakenSeconds,
      },
    });

    const updatedSession = await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        questionsAnswered: { increment: 1 },
        correctAnswers: isCorrect ? { increment: 1 } : undefined,
        totalTimeSeconds: { increment: timeTakenSeconds ?? 0 },
      },
      select: { questionsAnswered: true, totalQuestions: true },
    });

    const isLastQuestion = updatedSession.questionsAnswered >= updatedSession.totalQuestions;

    achievementsService
      .checkAllAchievements(userId)
      .catch((err) => console.error('Achievement check failed:', err));

    return {
      attemptId: attempt.id,
      isCorrect,
      correctAnswer: question.correctAnswer ?? '',
      explanation: question.explanation ?? null,
      isLastQuestion,
    };
  }

  // ─── getQuizResults ───────────────────────────────────────────────────────
  // Called once after last question. Closes session, computes streak + results.
  // All numbers are whole — no decimals sent to frontend.

  async getQuizResults(userId: string, sessionId: string): Promise<QuizResultsResponse> {
    let session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        userId: true,
        totalQuestions: true,
        correctAnswers: true,
        totalTimeSeconds: true,
        isCompleted: true,
        completedAt: true,
        questionsAnswered: true,
      },
    });

    if (!session || session.userId !== userId) {
      throw new AppError('Quiz session not found');
    }

    // Idempotent — safe to call twice (e.g. double tap)
    if (!session.isCompleted) {
      session = await prisma.quizSession.update({
        where: { id: sessionId },
        data: { isCompleted: true, completedAt: new Date() },
        select: {
          id: true,
          userId: true,
          totalQuestions: true,
          correctAnswers: true,
          totalTimeSeconds: true,
          isCompleted: true,
          completedAt: true,
          questionsAnswered: true,
        },
      });
    }

    const total = session.totalQuestions;
    const score = session.correctAnswers;
    const accuracyPercent = total > 0 ? Math.round((score / total) * 100) : 0;
    const avgTimePerQuestionSeconds = total > 0 ? Math.round(session.totalTimeSeconds / total) : 0;

    // ── Streak: consecutive calendar days with ≥1 completed QuizSession
    const completedSessions = await prisma.quizSession.findMany({
      where: { userId, isCompleted: true, completedAt: { not: null } },
      select: { completedAt: true },
      orderBy: { completedAt: 'desc' },
    });

    const activeDays = new Set<string>();
    for (const s of completedSessions) {
      if (s.completedAt) {
        activeDays.add(s.completedAt.toISOString().slice(0, 10));
      }
    }

    const quizStreak = this.calculateStreak(activeDays);
    const motivationalMessage = this.getMotivationalMessage(accuracyPercent);
    const badgeUnlocked = accuracyPercent === 100;

    return {
      sessionId: session.id,
      score,
      total,
      accuracyPercent,
      avgTimePerQuestionSeconds,
      quizStreak,
      motivationalMessage,
      badgeUnlocked,
      completedAt: session.completedAt!.toISOString(),
    };
  }

  // ─── getLessonEssayQuestion ───────────────────────────────────────────────
  // Creates PracticeSession immediately on fetch.
  // Returns practiceSessionId — frontend sends ONLY this on submit.

  async getLessonEssayQuestion(userId: string, lessonId: string): Promise<GetLessonEssayResponse> {
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

    // Priority 1: questions linked to this lesson
    let essays = await prisma.essayQuestion.findMany({
      where: { lessonId, isPublished: true },
      select: { id: true, text: true, subject: true },
    });

    // Priority 2: any question from the same subject
    if (essays.length === 0) {
      essays = await prisma.essayQuestion.findMany({
        where: { isPublished: true, subject: lesson.module.subject.name },
        select: { id: true, text: true, subject: true },
      });
    }

    if (essays.length === 0) {
      throw new AppError('No essay questions available for this lesson');
    }

    const question = essays[Math.floor(Math.random() * essays.length)]!;

    // Create PracticeSession immediately — frontend stores this ID for submit
    const practiceSession = await prisma.practiceSession.create({
      data: {
        userId,
        subject: lesson.module.subject.name,
        year: null,
        questionIds: [question.id],
        startedAt: new Date(),
        isCompleted: false,
      },
    });

    return {
      practiceSessionId: practiceSession.id,
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

  // ─── submitLessonEssay ────────────────────────────────────────────────────
  // Frontend sends: { practiceSessionId, answerText } — nothing else.
  // Backend resolves question from session. Grades with Claude AI.
  // Returns full review screen data in one shot.

  async submitLessonEssay(
    userId: string,
    input: SubmitLessonEssayInput
  ): Promise<SubmitLessonEssayResponse> {
    const { practiceSessionId, answerText } = input;

    if (!answerText || answerText.trim().split(/\s+/).length < 20) {
      throw new AppError('Answer is too short to grade');
    }

    const practiceSession = await prisma.practiceSession.findUnique({
      where: { id: practiceSessionId },
      select: { id: true, userId: true, subject: true, questionIds: true, isCompleted: true },
    });

    if (!practiceSession || practiceSession.userId !== userId) {
      throw new AppError('Practice session not found');
    }
    if (practiceSession.isCompleted) {
      throw new AppError('This essay has already been submitted');
    }

    const essayQuestionId = practiceSession.questionIds[0];
    if (!essayQuestionId) throw new AppError('No question found in session');

    const essayQuestion = await prisma.essayQuestion.findUnique({
      where: { id: essayQuestionId },
      select: { id: true, text: true, subject: true, lessonId: true },
    });

    if (!essayQuestion) throw new AppError('Essay question not found');

    const lesson = await prisma.lesson.findUnique({
      where: { id: essayQuestion.lessonId },
      select: { id: true, title: true },
    });

    const startedAt = Date.now();

    const grading = await gradeEssayWithClaude(
      answerText,
      essayQuestion.text,
      essayQuestion.subject
    );

    const timeTakenSeconds = Math.floor((Date.now() - startedAt) / 1000);
    const wordCount = answerText.trim().split(/\s+/).length;
    const aiScore20 = Math.round((grading.score / 100) * 20);

    // Save EssayAttempt — source = LESSON_PRACTICE, simulationId links to session
    const attempt = await prisma.essayAttempt.create({
      data: {
        userId,
        essayQuestionId,
        questionId: null,
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
        simulationId: practiceSessionId,
      } as any,
      select: { id: true },
    });

    // Close the practice session
    await prisma.practiceSession.update({
      where: { id: practiceSessionId },
      data: { isCompleted: true, submittedAt: new Date(), totalTimeSeconds: timeTakenSeconds },
    });

    achievementsService
      .checkAllAchievements(userId)
      .catch((err) => console.error('Achievement check failed:', err));

    return {
      attemptId: attempt.id,
      lessonId: lesson?.id ?? essayQuestion.lessonId,
      lessonTitle: lesson?.title ?? 'Lesson',
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

  // ─── getAllLessonMCQs ─────────────────────────────────────────────────────

  async getAllLessonMCQs(lessonId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isPublished: true },
      select: { id: true, title: true },
    });

    if (!lesson) throw new AppError('Lesson not found');

    const questions = await prisma.question.findMany({
      where: { lessonId, type: 'MCQ', isPublished: true },
      select: {
        id: true,
        text: true,
        options: true,
        points: true,
        correctAnswer: true,
        explanation: true,
      },
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

  // ─── getAllLessonEssayQuestions ────────────────────────────────────────────

  async getAllLessonEssayQuestions(lessonId: string) {
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

  // ─── getAllMCQs ───────────────────────────────────────────────────────────

  async getAllMCQs() {
    const questions = await prisma.question.findMany({
      where: { type: 'MCQ', isPublished: true, lessonId: { not: null } },
      select: {
        id: true,
        text: true,
        options: true,
        points: true,
        lessonId: true,
        lesson: {
          select: {
            id: true,
            title: true,
            module: { select: { subject: { select: { name: true } } } },
          },
        },
      },
      orderBy: [{ lesson: { module: { order: 'asc' } } }, { order: 'asc' }],
    });

    return {
      total: questions.length,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options as Record<string, string>,
        points: q.points,
        lessonId: q.lessonId,
        lessonTitle: q.lesson?.title ?? null,
        subject: q.lesson?.module?.subject?.name ?? null,
      })),
    };
  }

  // ─── getAllEssayQuestions ─────────────────────────────────────────────────

  async getAllEssayQuestions() {
    const questions = await prisma.essayQuestion.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        text: true,
        subject: true,
        lessonId: true,
        lesson: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return {
      total: questions.length,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        subject: q.subject,
        lessonId: q.lessonId,
        lessonTitle: q.lesson?.title ?? null,
      })),
    };
  }

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private calculateStreak(activeDays: Set<string>): number {
    if (activeDays.size === 0) return 0;

    let streak = 0;
    const cursor = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');

    while (true) {
      const dateKey = cursor.toISOString().slice(0, 10);
      if (activeDays.has(dateKey)) {
        streak++;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  private getMotivationalMessage(accuracyPercent: number): string {
    if (accuracyPercent === 100) return 'Congratulation! You have passed the test with 100%';
    if (accuracyPercent >= 80)
      return `Congratulation! You have passed the test with ${accuracyPercent}%`;
    if (accuracyPercent >= 60)
      return `Good effort! You have passed the test with ${accuracyPercent}%`;
    if (accuracyPercent >= 40)
      return `Don't worry - practice makes perfect! You have passed the test with ${accuracyPercent}%`;
    return `Keep going! Every attempt makes you stronger. You scored ${accuracyPercent}%`;
  }
}

export default new LessonService();