// src/scripts/seed-achievements.ts

import { PrismaClient, AchievementType } from '@prisma/client';

const prisma = new PrismaClient();

async function seedAchievements() {
  console.log('🏆 Seeding achievements...');

  const achievements = [
    // ============================================
    // LESSON_MILESTONE
    // ============================================
    {
      title: 'First Lesson Completed',
      description: 'Started your learning journey.',
      type: AchievementType.LESSON_MILESTONE,
      condition: { lessonsCompleted: 1 },
      icon: '📚',
    },
    {
      title: 'Video Enthusiast',
      description: 'Watched 10 lesson videos.',
      type: AchievementType.LESSON_MILESTONE,
      condition: { lessonsCompleted: 10 },
      icon: '🎥',
    },
    {
      title: 'Binge Learner',
      description: 'Watched 5 lessons in one day.',
      type: AchievementType.LESSON_MILESTONE,
      condition: { lessonsInOneDay: 5 },
      icon: '⚡',
    },
    {
      title: 'Module Master',
      description: 'Completed 100% of one module.',
      type: AchievementType.LESSON_MILESTONE,
      condition: { moduleCompletion: 100 },
      icon: '🎓',
    },

    // ============================================
    // STREAK_MILESTONE
    // ============================================
    {
      title: '3-Day Streak',
      description: 'Consistency begins.',
      type: AchievementType.STREAK_MILESTONE,
      condition: { streak: 3 },
      icon: '🔥',
    },
    {
      title: '7-Day Streak',
      description: 'One week of dedication!',
      type: AchievementType.STREAK_MILESTONE,
      condition: { streak: 7 },
      icon: '🏆',
    },
    {
      title: '30-Day Streak',
      description: 'Monthly warrior!',
      type: AchievementType.STREAK_MILESTONE,
      condition: { streak: 30 },
      icon: '💎',
    },
    {
      title: 'Weekend Warrior',
      description: 'Studied on both Saturday and Sunday.',
      type: AchievementType.STREAK_MILESTONE,
      condition: { weekendStudy: true },
      icon: '🛡️',
    },
    {
      title: 'Early Bird',
      description: 'Studied before 7 AM.',
      type: AchievementType.STREAK_MILESTONE,
      condition: { studyBefore: 7 },
      icon: '🌅',
    },
    {
      title: 'Night Owl',
      description: 'Studied after 10 PM.',
      type: AchievementType.STREAK_MILESTONE,
      condition: { studyAfter: 22 },
      icon: '🦉',
    },

    // ============================================
    // QUIZ_ACCURACY
    // ============================================
    {
      title: 'Quiz Novice',
      description: 'Completed your first quiz.',
      type: AchievementType.QUIZ_ACCURACY,
      condition: { quizzesCompleted: 1 },
      icon: '✅',
    },
    {
      title: '50% Subject Mastery',
      description: 'Halfway through your core subject.',
      type: AchievementType.QUIZ_ACCURACY,
      condition: { quizAccuracy: 50, minQuizzes: 10 },
      icon: '📊',
    },
    {
      title: '90% Quiz Accuracy',
      description: 'Excellence in testing.',
      type: AchievementType.QUIZ_ACCURACY,
      condition: { quizAccuracy: 90, minQuizzes: 50 },
      icon: '🌟',
    },
    {
      title: 'Perfect Quiz',
      description: '100% on a quiz attempt.',
      type: AchievementType.QUIZ_ACCURACY,
      condition: { perfectQuiz: true },
      icon: '💯',
    },
    {
      title: 'Quiz Streak',
      description: '10 consecutive correct answers.',
      type: AchievementType.QUIZ_ACCURACY,
      condition: { consecutiveCorrect: 10 },
      icon: '🎯',
    },

    // ============================================
    // PRACTICE_MILESTONE (Essays)
    // ============================================
    {
      title: 'First Essay Submitted',
      description: "You've taken your first step!",
      type: AchievementType.PRACTICE_MILESTONE,
      condition: { essaysSubmitted: 1 },
      icon: '📝',
    },
    {
      title: '5 Essays Completed',
      description: 'Building momentum!',
      type: AchievementType.PRACTICE_MILESTONE,
      condition: { essaysSubmitted: 5 },
      icon: '🚀',
    },
    {
      title: '10 Essays Completed',
      description: 'Dedication paying off!',
      type: AchievementType.PRACTICE_MILESTONE,
      condition: { essaysSubmitted: 10 },
      icon: '💪',
    },
    {
      title: 'Practice Perfectionist',
      description: 'Scored 95%+ on 3 essays.',
      type: AchievementType.PRACTICE_MILESTONE,
      condition: { highScores: 3, minScore: 95 },
      icon: '⭐',
    },
    {
      title: 'Speed Reader',
      description: 'Finished essay under average time.',
      type: AchievementType.PRACTICE_MILESTONE,
      condition: { underAverageTime: true },
      icon: '⚡',
    },
    {
      title: 'All Subjects Attempted',
      description: 'Attempted at least 1 essay per subject.',
      type: AchievementType.PRACTICE_MILESTONE,
      condition: { allSubjectsAttempted: true },
      icon: '🌍',
    },

    // ============================================
    // EXAM_SIMULATION
    // ============================================
    {
      title: 'Exam Simulation Completed',
      description: 'You practised under real exam conditions.',
      type: AchievementType.EXAM_SIMULATION,
      condition: { simulationsCompleted: 1 },
      icon: '🎓',
    },
    {
      title: 'Simulation Master',
      description: 'Passed 3 simulations.',
      type: AchievementType.EXAM_SIMULATION,
      condition: { simulationsPassed: 3 },
      icon: '🏅',
    },
    {
      title: 'Speed Demon',
      description: 'Finished simulation under 2.5 hours.',
      type: AchievementType.EXAM_SIMULATION,
      condition: { simulationTime: 9000 },
      icon: '🔥',
    },
    {
      title: 'Perfect Simulation',
      description: 'Scored 100% on a simulation.',
      type: AchievementType.EXAM_SIMULATION,
      condition: { perfectSimulation: true },
      icon: '💎',
    },

    // ============================================
    // SUBJECT_MASTERY
    // ============================================
    {
      title: 'Criminal Law Champion',
      description: 'Completed 10 Criminal Law essays.',
      type: AchievementType.SUBJECT_MASTERY,
      condition: { subject: 'Criminal Law', essaysCompleted: 10 },
      icon: '⚖️',
    },
    {
      title: 'Contract Law Expert',
      description: 'Scored 80%+ on 5 Contract Law essays.',
      type: AchievementType.SUBJECT_MASTERY,
      condition: { subject: 'Contract Law', highScores: 5, minScore: 80 },
      icon: '📜',
    },
    {
      title: 'Tort Law Specialist',
      description: 'Completed 10 Tort Law essays.',
      type: AchievementType.SUBJECT_MASTERY,
      condition: { subject: 'Tort Law', essaysCompleted: 10 },
      icon: '🛡️',
    },
    {
      title: 'Equity Scholar',
      description: 'Completed 10 Equity essays.',
      type: AchievementType.SUBJECT_MASTERY,
      condition: { subject: 'Equity', essaysCompleted: 10 },
      icon: '⚖️',
    },
    {
      title: 'Company Law Pro',
      description: 'Completed 10 Company Law essays.',
      type: AchievementType.SUBJECT_MASTERY,
      condition: { subject: 'Company Law', essaysCompleted: 10 },
      icon: '🏢',
    },
    {
      title: 'Property Law Master',
      description: 'Completed 10 Property Law essays.',
      type: AchievementType.SUBJECT_MASTERY,
      condition: { subject: 'Property Law', essaysCompleted: 10 },
      icon: '🏠',
    },

    // ============================================
    // IMPROVEMENT_ACHIEVEMENT
    // ============================================
    {
      title: 'Rising Star',
      description: 'Improved score by 20%+ on same question.',
      type: AchievementType.IMPROVEMENT_ACHIEVEMENT,
      condition: { scoreImprovement: 20, sameQuestion: true },
      icon: '📈',
    },
    {
      title: 'Comeback Kid',
      description: 'Failed first attempt, passed second.',
      type: AchievementType.IMPROVEMENT_ACHIEVEMENT,
      condition: { failedThenPassed: true },
      icon: '💪',
    },
    {
      title: 'Growth Mindset',
      description: 'Attempted same question 3+ times.',
      type: AchievementType.IMPROVEMENT_ACHIEVEMENT,
      condition: { sameQuestionAttempts: 3 },
      icon: '🌱',
    },

    // ============================================
    // TIME_ACHIEVEMENT
    // ============================================
    {
      title: 'Marathon Student',
      description: 'Studied for 5+ hours in one day.',
      type: AchievementType.TIME_ACHIEVEMENT,
      condition: { studyTimeSeconds: 18000 },
      icon: '🏃',
    },
    {
      title: 'Consistent Pacer',
      description: 'Finished 5 essays within 10% of average time.',
      type: AchievementType.TIME_ACHIEVEMENT,
      condition: { consistentPacing: 5 },
      icon: '⏱️',
    },

    // ============================================
    // CASE_LAW_MASTERY
    // ============================================
    {
      title: 'Case Citation Pro',
      description: 'Referenced 5+ cases in one essay.',
      type: AchievementType.CASE_LAW_MASTERY,
      condition: { casesReferenced: 5 },
      icon: '📚',
    },
    {
      title: 'Irish Law Scholar',
      description: 'Referenced Irish cases in 10 essays.',
      type: AchievementType.CASE_LAW_MASTERY,
      condition: { irishCasesUsed: 10 },
      icon: '🇮🇪',
    },

    // ============================================
    // COMBO_ACHIEVEMENT
    // ============================================
    {
      title: 'Triple Threat',
      description: 'Watched video + completed quiz + submitted essay in one day.',
      type: AchievementType.COMBO_ACHIEVEMENT,
      condition: { videoQuizEssaySameDay: true },
      icon: '🎯',
    },
    {
      title: 'Well-Rounded',
      description: 'Studied 3+ subjects in one week.',
      type: AchievementType.COMBO_ACHIEVEMENT,
      condition: { subjectsInWeek: 3 },
      icon: '🌈',
    },
    {
      title: 'Exam Ready',
      description: 'Passed simulation + 50% subject mastery.',
      type: AchievementType.COMBO_ACHIEVEMENT,
      condition: { simulationPassed: true, subjectMastery: 50 },
      icon: '🎖️',
    },
  ];

  await prisma.achievement.createMany({
    data: achievements,
  });

  console.log(`✅ Seeded ${achievements.length} achievements`);
}

seedAchievements()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
