// check-actual-db.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkDB() {
  const lesson = await prisma.lesson.findFirst({
    where: { slug: 'offer' },
    select: {
      title: true,
      videoDuration: true,
      videoUrl: true,
    },
  });

  console.log('Actual DB value:', lesson);
}

checkDB().finally(() => prisma.$disconnect());
