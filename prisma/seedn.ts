// prisma/seedModulesAndLessons.ts
//
// STEP 1 — Run this FIRST before any other seed.
//
// HOW TO USE:
//   1. Create the folder:  prisma/data/modules/
//   2. Drop ALL your module JSON files in there
//      e.g. Company_Law_Module_01.json, Constitutional_Law_Module_02.json etc.
//   3. Run:
//      export DATABASE_URL="postgresql://Fe1user:Fe1Made%24imple%232026@35.195.139.190:5432/fe1db?sslmode=require"
//      npx ts-node -r tsconfig-paths/register prisma/seedModulesAndLessons.ts

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MODULES_DIR = path.join(__dirname, 'data', 'modules');

// ─── Filename prefix → exact subject name in DB ───────────────────────────────
const SUBJECT_NAME_MAP: Record<string, string> = {
  Company_Law: 'Company Law',
  Constitutional_Law: 'Constitutional Law',
  Contract_Law: 'Contract Law',
  Criminal_Law: 'Criminal Law',
  Tort_Law: 'Tort Law',
  EU_Law: 'EU Law',
  Equity_Law: 'Equity', // DB has "Equity" not "Equity Law"
  Property_Law: 'Land Law', // DB has "Land Law" not "Property Law"
};

// ─── Slug generator ───────────────────────────────────────────────────────────
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ─── Parse filename ────────────────────────────────────────────────────────────
function parseFilename(filename: string): { subjectKey: string; moduleOrder: number } | null {
  const match = filename.match(/^(.+)_Module_(\d+)\.json$/i);
  if (!match) return null;
  return {
    subjectKey: match[1],
    moduleOrder: parseInt(match[2], 10),
  };
}

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('Seeding modules and lessons...\n');
  console.log(`Reading from: ${MODULES_DIR}\n`);

  if (!fs.existsSync(MODULES_DIR)) {
    console.error(`Folder not found: ${MODULES_DIR}`);
    console.error('Create prisma/data/modules/ and drop your JSON files in there.');
    process.exit(1);
  }

  const files = fs
    .readdirSync(MODULES_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    console.error('No JSON files found in the folder.');
    process.exit(1);
  }

  console.log(`Found ${files.length} JSON files\n`);

  const subjects = await prisma.subject.findMany({ select: { id: true, name: true } });
  const subjectMap = new Map(subjects.map((s) => [s.name, s.id]));

  let moduleCount = 0;
  let lessonCount = 0;
  const skipped: string[] = [];

  for (const filename of files) {
    const parsed = parseFilename(filename);
    if (!parsed) {
      console.warn(`Skipping — unexpected filename format: "${filename}"`);
      skipped.push(filename);
      continue;
    }

    const { subjectKey, moduleOrder } = parsed;

    const subjectName = SUBJECT_NAME_MAP[subjectKey];
    if (!subjectName) {
      console.warn(`Skipping — no subject mapping for: "${subjectKey}" (${filename})`);
      skipped.push(filename);
      continue;
    }

    const subjectId = subjectMap.get(subjectName);
    if (!subjectId) {
      console.warn(`Skipping — subject not in DB: "${subjectName}" (${filename})`);
      skipped.push(filename);
      continue;
    }

    const raw = fs.readFileSync(path.join(MODULES_DIR, filename), 'utf-8');
    let data: {
      subject: string;
      module: string;
      lessons: { title: string; description: string; order: number }[];
    };

    try {
      data = JSON.parse(raw);
    } catch {
      console.warn(`Skipping — invalid JSON: "${filename}"`);
      skipped.push(filename);
      continue;
    }

    if (!data.module || !Array.isArray(data.lessons)) {
      console.warn(`Skipping — missing "module" or "lessons" in: "${filename}"`);
      skipped.push(filename);
      continue;
    }

    console.log(
      `[${subjectName}] M${moduleOrder}: "${data.module}" — ${data.lessons.length} lessons`
    );

    // Upsert module — match by subjectId + order
    const existingModule = await prisma.module.findFirst({
      where: { subjectId, order: moduleOrder },
      select: { id: true },
    });

    let moduleId: string;

    if (existingModule) {
      await prisma.module.update({
        where: { id: existingModule.id },
        data: { name: data.module, isPublished: true },
      });
      moduleId = existingModule.id;
      console.log(`  Module updated`);
    } else {
      const created = await prisma.module.create({
        data: {
          subjectId,
          name: data.module,
          order: moduleOrder,
          isPublished: true,
        },
      });
      moduleId = created.id;
      console.log(`  Module created → ${moduleId}`);
    }

    moduleCount++;

    // Upsert lessons — match by moduleId + order
    for (const lesson of data.lessons) {
      if (!lesson.title || !lesson.order) {
        console.warn(`  Skipping lesson with missing title or order in ${filename}`);
        continue;
      }

      const slug = toSlug(lesson.title);
      const content = lesson.description ?? '';

      const existingLesson = await prisma.lesson.findFirst({
        where: { moduleId, order: lesson.order },
        select: { id: true },
      });

      if (existingLesson) {
        await prisma.lesson.update({
          where: { id: existingLesson.id },
          data: { title: lesson.title, slug, content, isPublished: true },
        });
        console.log(`  L${lesson.order} updated: "${lesson.title}"`);
      } else {
        await prisma.lesson.create({
          data: {
            moduleId,
            title: lesson.title,
            slug,
            content,
            order: lesson.order,
            isPublished: true,
          },
        });
        console.log(`  L${lesson.order} created: "${lesson.title}" [slug: ${slug}]`);
      }

      lessonCount++;
    }

    console.log('');
  }

  console.log('='.repeat(60));
  console.log(`Done — ${moduleCount} modules, ${lessonCount} lessons processed`);

  if (skipped.length > 0) {
    console.log(`\n${skipped.length} file(s) skipped:`);
    skipped.forEach((f) => console.log(`  - ${f}`));
  }

  console.log('\nNext: run seedMCQ.ts');
}

seed()
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
