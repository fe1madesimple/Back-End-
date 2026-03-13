// prisma/seedModulesAndLessons.ts
//
// STEP 1 — Run this FIRST before any other seed.
// Creates all Module and Lesson rows in the DB.
//
// Run:
//   export DATABASE_URL="postgresql://Fe1user:Fe1Made%24imple%232026@35.195.139.190:5432/fe1db?sslmode=require"
//   npx ts-node -r tsconfig-paths/register prisma/seedModulesAndLessons.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── HOW TO ADD DATA ──────────────────────────────────────────────────────────
//
// Each object below = one module.
// `subject`  → must match EXACTLY the subject name already in your DB
// `module`   → the module name (shown in the sidebar)
// `order`    → which number module this is (1, 2, 3...) within that subject
// `lessons`  → array of lessons inside this module
//   └ `title`       → lesson title
//   └ `description` → short description shown under the title
//   └ `order`       → which number lesson this is (1, 2, 3...) within that module
//
// The `order` numbers are CRITICAL — the MCQ and essay seed scripts
// use them to find the right lesson. Do not skip numbers or repeat them.

const DATA: Array<{
  subject: string;
  module: string;
  order: number;
  lessons: Array<{
    title: string;
    description: string;
    order: number;
  }>;
}> = [
    

];   

// ─── Seed function ─────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 STEP 1 — Seeding modules and lessons...\n');

  const subjects = await prisma.subject.findMany({ select: { id: true, name: true } });
  const subjectMap = new Map(subjects.map((s) => [s.name, s.id]));

  console.log(`Found ${subjects.length} subjects in DB\n`);

  let moduleCount = 0;
  let lessonCount = 0;
  const notFound: string[] = [];

  for (const entry of DATA) {
    const subjectId = subjectMap.get(entry.subject);

    if (!subjectId) {
      notFound.push(entry.subject);
      console.warn(`⚠️  Subject not found: "${entry.subject}" — skipping`);
      continue;
    }

    // Find existing module by subject + name
    const existing = await prisma.module.findFirst({
      where: { subjectId, name: entry.module },
      select: { id: true },
    });

    let moduleId: string;

    if (existing) {
      await prisma.module.update({
        where: { id: existing.id },
        data: { order: entry.order, isPublished: true },
      });
      moduleId = existing.id;
      console.log(`  ↺ Module updated  [${entry.subject}] M${entry.order}: "${entry.module}"`);
    } else {
      const created = await prisma.module.create({
        data: { subjectId, name: entry.module, order: entry.order, isPublished: true },
      });
      moduleId = created.id;
      console.log(
        `  ✅ Module created  [${entry.subject}] M${entry.order}: "${entry.module}" → ${moduleId}`
      );
    }

    moduleCount++;

    for (const l of entry.lessons) {
      const existingLesson = await prisma.lesson.findFirst({
        where: { moduleId, title: l.title },
        select: { id: true },
      });

      if (existingLesson) {
        await prisma.lesson.update({
          where: { id: existingLesson.id },
          data: { description: l.description, order: l.order, isPublished: true },
        });
        console.log(`     ↺ Lesson updated  L${l.order}: "${l.title}"`);
      } else {
        const created = await prisma.lesson.create({
          data: {
            moduleId,
            title: l.title,
            description: l.description,
            order: l.order,
            isPublished: true,
          },
        });
        console.log(`     📖 Lesson created L${l.order}: "${l.title}" → ${created.id}`);
      }

      lessonCount++;
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`✅ Done — ${moduleCount} modules, ${lessonCount} lessons`);
  if (notFound.length) {
    console.log(`⚠️  Subjects not in DB: ${[...new Set(notFound)].join(', ')}`);
  }
  console.log('\n▶ Next: run seedMCQ.ts');
}

seed()
  .catch((e) => {
    console.error('❌ Failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
