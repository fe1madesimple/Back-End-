// scripts/update-podcast-titles.ts
// Run: npx ts-node -r tsconfig-paths/register scripts/update-podcast-titles.ts

import fs from 'fs';
import path from 'path';
import { prisma } from '@/shared/config';

const META_PATH = path.join(__dirname, '../prisma/episodes-meta.json');

const meta: Array<{
  filename: string;
  title: string;
  subject: string;
  episodeNotes: string;
}> = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));

const subjectNameMap: Record<string, string> = {
  'Company Law': 'Company Law',
  'Constitutional Law': 'Constitutional Law',
  'Contract Law': 'Contract Law',
  'Criminal Law': 'Criminal Law',
  Equity: 'Equity',
  'EU Law': 'EU Law',
  'Property Law': 'Property Law',
  'Tort Law': 'Tort Law',
  Bonus: 'Bonus',
};

// Build lookup: "filename::subjectName" → meta entry
const metaLookup = new Map(
  meta.map((m) => [`${m.filename}::${subjectNameMap[m.subject] ?? m.subject}`, m])
);

async function main() {
  console.log('\n🔄 Starting podcast title + notes update...\n');

  const podcasts = await prisma.podcast.findMany({
    select: {
      id: true,
      publicId: true,
      subjectName: true,
      title: true,
    },
  });

  console.log(`📦 Total podcasts in DB: ${podcasts.length}`);

  let updated = 0;
  let skipped = 0;
  const notFound: string[] = [];

  for (const podcast of podcasts) {
    const rawName = path.basename(podcast.publicId);

    const filenameM4a = `${rawName}.m4a`;
    const filenameMP3 = `${rawName}.mp3`;

    const key1 = `${filenameM4a}::${podcast.subjectName}`;
    const key2 = `${filenameMP3}::${podcast.subjectName}`;

    const metaEntry = metaLookup.get(key1) ?? metaLookup.get(key2);

    if (!metaEntry) {
      notFound.push(`[${podcast.subjectName}] ${rawName} (id: ${podcast.id})`);
      skipped++;
      continue;
    }

    await prisma.podcast.update({
      where: { id: podcast.id },
      data: {
        title: metaEntry.title,
        notes: metaEntry.episodeNotes,
      },
    });

    updated++;
    console.log(`  ✅ [${podcast.subjectName}] "${metaEntry.title}"`);
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`SUMMARY:`);
  console.log(`  Total in DB:  ${podcasts.length}`);
  console.log(`  Updated:      ${updated}`);
  console.log(`  Skipped:      ${skipped}`);
  console.log('─────────────────────────────────────────');

  if (notFound.length > 0) {
    console.log(`\n⚠️  Could not find meta for:`);
    notFound.forEach((n) => console.log(`   - ${n}`));
  } else {
    console.log('\n🎉 All 269 podcasts updated successfully\n');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
