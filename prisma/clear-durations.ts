import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllDurations() {
  console.log('🔄 Clearing all video durations...\n');

  const result = await prisma.lesson.updateMany({
    data: {
      videoDuration: null,
    },
  });

  console.log(`✅ Cleared videoDuration from ${result.count} lessons\n`);

  // Verify
  const lessons = await prisma.lesson.findMany({
    select: {
      title: true,
      videoDuration: true,
    },
    take: 5,
  });

  console.log('📊 Sample of updated lessons:');
  lessons.forEach((lesson) => {
    console.log(`   ${lesson.title}: ${lesson.videoDuration ?? 'NULL'}`);
  });

  const stats = await prisma.lesson.aggregate({
    _count: {
      videoDuration: true, // Count non-null durations
    },
  });

  console.log(`\n✅ Total lessons with duration: ${stats._count.videoDuration}`);
  console.log(`✅ All durations are now NULL\n`);
}

clearAllDurations()
  .catch((e) => {
    console.error('❌ Error clearing durations:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
