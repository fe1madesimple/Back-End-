// prisma/seedEssayQuestionBank.ts
//
// STEP 3 — Run this AFTER seedModulesAndLessons.ts
//
// HOW TO USE:
//   1. Create the folder:  prisma/data/essays/
//   2. Drop ALL your essay JSON files in there — all subjects, one folder
//      The script expects ONE JSON file per subject containing ALL questions for that subject.
//      Filename format: CompanyLaw_Essays.json, ConstitutionalLaw_Essays.json etc.
//      OR one big combined file: all_essays.json
//
//   Actually — since client provided ONE big JSON with all 747 questions,
//   just drop that single file in prisma/data/essays/ and it will be processed.
//
//   3. Run:
//      export DATABASE_URL="postgresql://Fe1user:Fe1Made%24imple%232026@35.195.139.190:5432/fe1db?sslmode=require"
//      npx ts-node -r tsconfig-paths/register prisma/seedEssayQuestionBank.ts
//
// JSON shape expected (each question in the "questions" array):
// {
//   "id": 1,              -- ignored
//   "subject": "Company Law",
//   "slug": "company_law", -- ignored
//   "module": 1,           -- moduleOrder
//   "lesson": 1,           -- lessonOrder
//   "lessonTitle": "...",  -- ignored
//   "text": "Explain..."   -- the essay question text
// }

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS_DIR = path.join(__dirname, 'data', 'essays');

// ─── Subject name normalisation ───────────────────────────────────────────────
// The JSON uses old names like "Equity Law" and "Property Law"
// Map them to what's actually in the DB

const SUBJECT_NAME_MAP: Record<string, string> = {
  'Company Law': 'Company Law',
  'Constitutional Law': 'Constitutional Law',
  'Contract Law': 'Contract Law',
  'Criminal Law': 'Criminal Law',
  'Tort Law': 'Tort Law',
  'EU Law': 'EU Law',
  'Equity Law': 'Equity', // DB has "Equity"
  'Property Law': 'Land Law', // DB has "Land Law"
  // Also handle already-correct names
  Equity: 'Equity',
  'Land Law': 'Land Law',
};

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding Essay Question Bank...\n');
  console.log(`Reading from: ${ESSAYS_DIR}\n`);

  if (!fs.existsSync(ESSAYS_DIR)) {
    console.error(`Folder not found: ${ESSAYS_DIR}`);
    console.error('Create prisma/data/essays/ and drop your essay JSON files in there.');
    process.exit(1);
  }

  const files = fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    console.error('No JSON files found in the folder.');
    process.exit(1);
  }

  console.log(`Found ${files.length} JSON file(s)\n`);

  // ── Collect all questions from all files
  const allQuestions: Array<{
    subject: string;
    module: number;
    lesson: number;
    text: string;
  }> = [];

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(ESSAYS_DIR, filename), 'utf-8');
    let data: { questions?: any[] } | any[];

    try {
      data = JSON.parse(raw);
    } catch {
      console.warn(`Skipping — invalid JSON: "${filename}"`);
      continue;
    }

    // Support both { questions: [...] } shape and direct array [...]
    const questions = Array.isArray(data) ? data : ((data as any).questions ?? []);

    if (!Array.isArray(questions) || questions.length === 0) {
      console.warn(`Skipping — no questions found in: "${filename}"`);
      continue;
    }

    console.log(`Loaded ${questions.length} questions from "${filename}"`);
    allQuestions.push(...questions);
  }

  console.log(`\nTotal questions to process: ${allQuestions.length}\n`);

  // ── Build lesson lookup: "DBSubjectName::moduleOrder::lessonOrder" → { lessonId, moduleId }
  const lessons = await prisma.lesson.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      order: true,
      moduleId: true,
      module: {
        select: {
          order: true,
          subject: { select: { name: true } },
        },
      },
    },
  });

  const lessonMap = new Map<string, { lessonId: string; moduleId: string }>();
  for (const l of lessons) {
    const key = `${l.module.subject.name}::${l.module.order}::${l.order}`;
    lessonMap.set(key, { lessonId: l.id, moduleId: l.moduleId });
  }

  console.log(`Lesson lookup built — ${lessonMap.size} lessons indexed\n`);

  let created = 0;
  let alreadyExists = 0;
  let skipped = 0;

  // Track skipped subjects for summary
  const skippedItems: string[] = [];

  for (const q of allQuestions) {
    if (!q.subject || !q.module || !q.lesson || !q.text) {
      skipped++;
      continue;
    }

    // Normalise subject name
    const dbSubject = SUBJECT_NAME_MAP[q.subject];
    if (!dbSubject) {
      console.warn(`No subject mapping for: "${q.subject}" — skipping`);
      skippedItems.push(`${q.subject} M${q.module} L${q.lesson}`);
      skipped++;
      continue;
    }

    const key = `${dbSubject}::${q.module}::${q.lesson}`;
    const match = lessonMap.get(key);

    if (!match) {
      // Lesson doesn't exist — student hasn't studied it yet, skip silently
      skippedItems.push(key);
      skipped++;
      continue;
    }

    const { lessonId, moduleId } = match;

    // Idempotent — skip if already seeded (match by lessonId + text)
    const exists = await prisma.essayQuestion.findFirst({
      where: { lessonId, text: q.text },
      select: { id: true },
    });

    if (exists) {
      alreadyExists++;
      continue;
    }

    await prisma.essayQuestion.create({
      data: {
        moduleId,
        lessonId,
        subject: dbSubject,
        text: q.text,
        isPublished: true,
      },
    });

    created++;

    // Log progress every 50 questions
    if (created % 50 === 0) {
      console.log(`  ${created} essay questions created so far...`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Done — ${created} essay questions created`);
  console.log(`       ${alreadyExists} already existed (skipped)`);
  console.log(`       ${skipped} skipped (no matching lesson or malformed)`);

  if (skippedItems.length > 0) {
    // Deduplicate and show unique skipped keys
    const unique = [...new Set(skippedItems)];
    console.log(`\nSkipped lesson keys (${unique.length} unique):`);
    unique.forEach((k) => console.log(`  - ${k}`));
    console.log('\nNote: Skipped questions are for lessons not yet in the DB.');
    console.log('This is expected — students cannot be tested on unstudied content.');
  }

  console.log('\nAll done! Essay Question Bank seeded successfully.');
}

seed()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
