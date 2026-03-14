// prisma/seedMCQ.ts
//
// STEP 2 — Run this AFTER seedModulesAndLessons.ts
//
// HOW TO USE:
//   1. Create the folder:  prisma/data/mcqs/
//   2. Drop ALL your MCQ JSON files in there — from all subjects, all in one folder
//      e.g. CompanyLaw_MCQs_Module01_Lesson02.json
//           ConstitutionalLaw_MCQs_Module01_Lesson01.json
//           CriminalLaw_MCQs_Module04_Lesson01.json  etc.
//   3. Run:
//      export DATABASE_URL="postgresql://Fe1user:Fe1Made%24imple%232026@35.195.139.190:5432/fe1db?sslmode=require"
//      npx ts-node -r tsconfig-paths/register prisma/seedMCQ.ts
//
// The script reads every .json file, parses the filename to get
// subject + moduleOrder + lessonOrder, then seeds all questions
// from the "questions" array — picking only the fields it needs
// and ignoring everything else (id, el_script_ref, module_title etc.)

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MCQS_DIR = path.join(__dirname, 'data', 'mcqs');

// ─── Filename prefix → exact subject name in DB ───────────────────────────────
// Must match exactly what's in your subjects table.

const SUBJECT_NAME_MAP: Record<string, string> = {
  CompanyLaw: 'Company Law',
  ConstitutionalLaw: 'Constitutional Law',
  ContractLaw: 'Contract Law',
  CriminalLaw: 'Criminal Law',
  TortLaw: 'Tort Law',
  EULaw: 'EU Law',
  EquityLaw: 'Equity', // DB has "Equity"
  PropertyLaw: 'Land Law', // DB has "Land Law"
};

// ─── Parse filename ────────────────────────────────────────────────────────────
// "CompanyLaw_MCQs_Module01_Lesson02.json"
// → { subjectKey: "CompanyLaw", moduleOrder: 1, lessonOrder: 2 }

function parseFilename(filename: string): {
  subjectKey: string;
  moduleOrder: number;
  lessonOrder: number;
} | null {
  // Pattern: <SubjectKey>_MCQs_Module<NN>_Lesson<NN>.json
  const match = filename.match(/^(.+)_MCQs_Module(\d+)_Lesson(\d+)\.json$/i);
  if (!match) return null;
  return {
    subjectKey: match[1],
    moduleOrder: parseInt(match[2], 10),
    lessonOrder: parseInt(match[3], 10),
  };
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding MCQ questions from JSON files...\n');
  console.log(`Reading from: ${MCQS_DIR}\n`);

  if (!fs.existsSync(MCQS_DIR)) {
    console.error(`Folder not found: ${MCQS_DIR}`);
    console.error('Create prisma/data/mcqs/ and drop your MCQ JSON files in there.');
    process.exit(1);
  }

  const files = fs
    .readdirSync(MCQS_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    console.error('No JSON files found in the folder.');
    process.exit(1);
  }

  console.log(`Found ${files.length} JSON files\n`);

  // ── Build lesson lookup: "SubjectName::moduleOrder::lessonOrder" → lessonId
  const lessons = await prisma.lesson.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      order: true,
      module: {
        select: {
          order: true,
          subject: { select: { name: true } },
        },
      },
    },
  });

  const lessonMap = new Map<string, string>();
  for (const l of lessons) {
    const key = `${l.module.subject.name}::${l.module.order}::${l.order}`;
    lessonMap.set(key, l.id);
  }

  console.log(`Lesson lookup built — ${lessonMap.size} lessons indexed\n`);

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalAlreadyExists = 0;
  const errors: string[] = [];

  for (const filename of files) {
    const parsed = parseFilename(filename);
    if (!parsed) {
      console.warn(`Skipping — unexpected filename format: "${filename}"`);
      errors.push(filename);
      continue;
    }

    const { subjectKey, moduleOrder, lessonOrder } = parsed;

    const subjectName = SUBJECT_NAME_MAP[subjectKey];
    if (!subjectName) {
      console.warn(`Skipping — no subject mapping for: "${subjectKey}" (${filename})`);
      console.warn(`Add it to SUBJECT_NAME_MAP at the top of this script.`);
      errors.push(filename);
      continue;
    }

    const key = `${subjectName}::${moduleOrder}::${lessonOrder}`;
    const lessonId = lessonMap.get(key);

    if (!lessonId) {
      console.warn(`Skipping — no lesson found for: "${key}" (${filename})`);
      console.warn(`Make sure seedModulesAndLessons.ts has been run first.`);
      errors.push(filename);
      continue;
    }

    // ── Read JSON
    const raw = fs.readFileSync(path.join(MCQS_DIR, filename), 'utf-8');
    let data: { questions: any[] };

    try {
      data = JSON.parse(raw);
    } catch {
      console.warn(`Skipping — invalid JSON: "${filename}"`);
      errors.push(filename);
      continue;
    }

    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      console.warn(`Skipping — no questions array in: "${filename}"`);
      errors.push(filename);
      continue;
    }

    console.log(
      `[${subjectName}] M${moduleOrder} L${lessonOrder} — ${data.questions.length} questions`
    );

    let fileCreated = 0;
    let fileExists = 0;

    for (const q of data.questions) {
      if (!q.question || !q.options || !q.correct_answer) {
        totalSkipped++;
        continue;
      }

      // Idempotent — skip if already seeded (match by lessonId + question text)
      const exists = await prisma.question.findFirst({
        where: { lessonId, text: q.question },
        select: { id: true },
      });

      if (exists) {
        fileExists++;
        totalAlreadyExists++;
        continue;
      }

      await prisma.question.create({
        data: {
          lessonId,
          text: q.question,
          type: 'MCQ',
          options: q.options, // { A, B, C, D }
          correctAnswer: q.correct_answer,
          explanation: q.explanation ?? null,
          subject: subjectName,
          points: 1,
          isPublished: true,
        },
      });

      fileCreated++;
      totalCreated++;
    }

    console.log(`  → ${fileCreated} created, ${fileExists} already existed`);
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Done — ${totalCreated} MCQs created`);
  console.log(`       ${totalAlreadyExists} already existed (skipped)`);
  console.log(`       ${totalSkipped} malformed questions skipped`);

  if (errors.length > 0) {
    console.log(`\n${errors.length} file(s) had errors:`);
    errors.forEach((f) => console.log(`  - ${f}`));
  }

  console.log('\nNext: run seedEssayQuestions.ts');
}

seed()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
