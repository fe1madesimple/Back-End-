import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixTitles() {
  console.log('🔧 Starting title fixes...\n');

  // Get all lessons
  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  let fixedCount = 0;

  for (const lesson of lessons) {
    // Remove "Lesson 1: ", "Lesson 2: ", etc. from beginning
    let newTitle = lesson.title.replace(/^Lesson \d+:\s*/i, '');

    // Remove "Module 1: ", "Module 2: ", etc. from beginning
    newTitle = newTitle.replace(/^Module \d+:\s*/i, '');

    // Only update if title changed
    if (newTitle !== lesson.title) {
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { title: newTitle },
      });

      console.log(`✅ Fixed: "${lesson.title}" → "${newTitle}"`);
      fixedCount++;
    }
  }

  console.log(`\n✨ Done! Fixed ${fixedCount} lesson titles.`);
}

fixTitles()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });