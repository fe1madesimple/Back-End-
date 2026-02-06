// prisma/check-all-lessons.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkAllLessons() {
  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      videoDuration: true,
      videoUrl: true,
      videoPublicId: true,
      createdAt: true,
    },
    orderBy: [{ module: { order: 'asc' } }, { order: 'asc' }],
  });

  console.log(`\n📊 Found ${lessons.length} lessons:\n`);

  lessons.forEach((lesson, index) => {
    console.log(`${index + 1}. ${lesson.title}`);
    console.log(`   Duration: ${lesson.videoDuration ?? 'NULL'}`);
    console.log(`   URL: ${lesson.videoUrl?.substring(0, 60)}...`);
    console.log(`   Created: ${lesson.createdAt}`);
    console.log('');
  });

  // Stats
  const withDuration = lessons.filter((l) => l.videoDuration !== null);
  const withoutDuration = lessons.filter((l) => l.videoDuration === null);

  console.log('\n📈 STATISTICS:');
  console.log(`✅ Lessons WITH duration: ${withDuration.length}`);
  console.log(`❌ Lessons WITHOUT duration: ${withoutDuration.length}`);
  console.log(`📺 Total lessons: ${lessons.length}`);
}

checkAllLessons()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
