// scripts/fix-criminal-law-mcqs.ts
// Targeted fix for Criminal Law MCQ seeding issues:
// 1. Removes duplicate MCQs from M2/L1 (has 100, should have 10)
// 2. Seeds missing lessons (M6, M7, M12/L2, M13/L1, M13/L2)
// 3. Skips any lesson that already has the correct 10 MCQs
// Usage: npx ts-node -r tsconfig-paths/register scripts/fix-criminal-law-mcqs.ts

import * as fs from 'fs';
import * as path from 'path';
import { prisma } from '@/shared/config';

const MCQ_DIR = path.join(__dirname, '../prisma/data/mcq');

interface MCQQuestion {
  id: string | number;
  question: string;
  options: Record<string, string>;
  correct_answer: string;
  explanation?: string;
}

interface MCQFile {
  subject: string;
  module_number?: number;
  module?: number;
  lesson_number?: number;
  lesson?: number;
  questions: MCQQuestion[];
}

async function main() {
  console.log('\n🔧 Starting Criminal Law MCQ targeted fix...\n');

  // ── Get Criminal Law subject ──────────────────────────────────────────────
  const subject = await prisma.subject.findFirst({
    where: { name: 'Criminal Law' },
    select: { id: true },
  });

  if (!subject) throw new Error('Criminal Law subject not found');

  // ── Step 1: Fix M2/L1 duplicate (100 MCQs → should be 10) ────────────────
  console.log('🔍 Checking Criminal Law M2/L1 for duplicates...');

  const m2 = await prisma.module.findFirst({
    where: { subjectId: subject.id, order: 2 },
    select: { id: true, name: true },
  });

  if (m2) {
    const l1 = await prisma.lesson.findFirst({
      where: { moduleId: m2.id, order: 1 },
      select: { id: true, title: true },
    });

    if (l1) {
      const mcqCount = await prisma.question.count({
        where: { lessonId: l1.id, type: 'MCQ' },
      });

      console.log(`   M2/L1 "${l1.title}" has ${mcqCount} MCQs`);

      if (mcqCount > 10) {
        console.log(`   ⚠️  Removing all MCQs and reseeding from file...`);

        // Delete attempts first
        await prisma.questionAttempt.deleteMany({
          where: { question: { lessonId: l1.id, type: 'MCQ' } },
        });
        // Delete all MCQs for this lesson
        await prisma.question.deleteMany({
          where: { lessonId: l1.id, type: 'MCQ' },
        });

        // Reseed from file
        const file = path.join(MCQ_DIR, 'CriminalLaw_MCQs_Module02_Lesson01.json');
        const data: MCQFile = JSON.parse(fs.readFileSync(file, 'utf-8'));
        await prisma.question.createMany({
          data: data.questions.map((q) => ({
            lessonId: l1.id,
            type: 'MCQ' as const,
            text: q.question,
            options: q.options,
            correctAnswer: q.correct_answer,
            explanation: q.explanation ?? null,
            points: 1,
            order: 0,
            isPublished: true,
          })),
        });
        console.log(`   ✅ M2/L1 reseeded with ${data.questions.length} MCQs\n`);
      } else {
        console.log(`   ✅ M2/L1 looks correct — skipping\n`);
      }
    }
  }

  // ── Step 2: Process all Criminal Law files, skip already-seeded ───────────
  console.log('📁 Processing all Criminal Law MCQ files...\n');

  const files = fs
    .readdirSync(MCQ_DIR)
    .filter((f) => f.startsWith('CriminalLaw_') && f.endsWith('.json'))
    .sort();

  let seeded = 0;
  let skipped = 0;
  let failed = 0;

  for (const filename of files) {
    const filepath = path.join(MCQ_DIR, filename);
    const data: MCQFile = JSON.parse(fs.readFileSync(filepath, 'utf-8'));

    // Handle both field name formats
    const moduleOrder = data.module_number ?? (data as any).module;
    const lessonOrder = data.lesson_number ?? (data as any).lesson;

    if (!moduleOrder || !lessonOrder) {
      console.log(`❌ ${filename} — cannot determine module/lesson number`);
      failed++;
      continue;
    }

    // Find module
    const module = await prisma.module.findFirst({
      where: { subjectId: subject.id, order: moduleOrder },
      select: { id: true, name: true },
    });

    if (!module) {
      console.log(`❌ ${filename} — Module order=${moduleOrder} not found in DB`);
      failed++;
      continue;
    }

    // Find lesson
    const lesson = await prisma.lesson.findFirst({
      where: { moduleId: module.id, order: lessonOrder },
      select: { id: true, title: true },
    });

    if (!lesson) {
      console.log(
        `❌ ${filename} — Lesson order=${lessonOrder} not found in module "${module.name}"`
      );
      failed++;
      continue;
    }

    // Check existing MCQ count
    const existingCount = await prisma.question.count({
      where: { lessonId: lesson.id, type: 'MCQ', isPublished: true },
    });

    if (existingCount === data.questions.length) {
      console.log(`⏭️  ${filename.padEnd(50)} → already has ${existingCount} MCQs — skipping`);
      skipped++;
      continue;
    }

    if (existingCount > 0 && existingCount !== data.questions.length) {
      // Wrong count — wipe and reseed
      await prisma.questionAttempt.deleteMany({
        where: { question: { lessonId: lesson.id, type: 'MCQ' } },
      });
      await prisma.question.deleteMany({
        where: { lessonId: lesson.id, type: 'MCQ' },
      });
    }

    // Seed
    await prisma.question.createMany({
      data: data.questions.map((q) => ({
        lessonId: lesson.id,
        type: 'MCQ' as const,
        text: q.question,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: q.explanation ?? null,
        points: 1,
        order: 0,
        isPublished: true,
      })),
    });

    console.log(
      `✅ ${filename.padEnd(50)} → M${moduleOrder}/L${lessonOrder} "${lesson.title}" (${data.questions.length} Qs)`
    );
    seeded++;
  }

  // ── Final report ──────────────────────────────────────────────────────────
  console.log('\n');
  console.log('═'.repeat(60));
  console.log('FIX COMPLETE');
  console.log('═'.repeat(60));
  console.log(`  Files seeded:   ${seeded}`);
  console.log(`  Files skipped:  ${skipped} (already correct)`);
  console.log(`  Files failed:   ${failed}`);
  console.log('═'.repeat(60));

  // Final verification
  console.log('\n📊 Final Criminal Law MCQ count per lesson:\n');
  const lessons = await prisma.lesson.findMany({
    where: {
      isPublished: true,
      module: { subject: { name: 'Criminal Law' } },
    },
    select: {
      title: true,
      order: true,
      module: { select: { order: true } },
      _count: { select: { questions: { where: { type: 'MCQ', isPublished: true } } } },
    },
    orderBy: [{ module: { order: 'asc' } }, { order: 'asc' }],
  });

  lessons.forEach((l) => {
    const status = l._count.questions === 10 ? '✅' : l._count.questions === 0 ? '❌' : '⚠️ ';
    console.log(
      `${status} M${l.module.order}/L${l.order} "${l.title}" — ${l._count.questions} MCQs`
    );
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
