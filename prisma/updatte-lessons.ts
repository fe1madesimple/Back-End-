import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateLessons() {
  console.log('🔄 Updating lesson videos with randomized distribution...');

  const videos = [
    {
      url: 'https://res.cloudinary.com/db3waebh7/video/upload/v1770086914/Introduction_to_Criminal_Law_iqxt56.mp4',
      publicId: 'Introduction_to_Criminal_Law_iqxt56',
    },
    {
      url: 'https://res.cloudinary.com/db3waebh7/video/upload/v1770086914/The_Burden_of_Proof___Criminal_Law_zzq9f5.mp4',
      publicId: 'The_Burden_of_Proof___Criminal_Law_zzq9f5',
    },
    {
      url: 'https://res.cloudinary.com/db3waebh7/video/upload/v1770086906/Criminal_Conduct___Criminal_Law_behxig.mp4',
      publicId: 'Criminal_Conduct___Criminal_Law_behxig',
    },
    {
      url: 'https://res.cloudinary.com/db3waebh7/video/upload/v1770086905/Mens_Rea___Criminal_Law_sxrgfp.mp4',
      publicId: 'Mens_Rea___Criminal_Law_sxrgfp',
    },
    {
      url: 'https://res.cloudinary.com/db3waebh7/video/upload/v1770086904/Theories_of_Criminal_Law_wbzrl7.mp4',
      publicId: 'Theories_of_Criminal_Law_wbzrl7',
    },
    {
      url: 'https://res.cloudinary.com/db3waebh7/video/upload/v1770086894/Recklessness___Criminal_Law_onmesz.mp4',
      publicId: 'Recklessness___Criminal_Law_onmesz',
    },
  ];

  // Get all lessons ordered by module and order
  const lessons = await prisma.lesson.findMany({
    orderBy: [{ module: { order: 'asc' } }, { order: 'asc' }],
    select: { id: true, slug: true },
  });

  if (!lessons || lessons.length === 0) {
    console.log('❌ No lessons found in database');
    return;
  }

  console.log(`📊 Found ${lessons.length} lessons to update`);

  // Assign videos in rotating pattern
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];

    if (!lesson) {
      console.log(`⚠️ Skipping undefined lesson at index ${i}`);
      continue;
    }

    const video = videos[i % videos.length]; // Cycle through videos

    if (!video) {
      console.log(`No video found for index ${i}`);
      continue;
    }

    await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        videoUrl: video.url,
        videoPublicId: video.publicId,
      },
    });

    console.log(
      `✅ Updated lesson ${i + 1}/${lessons.length}: ${lesson.slug} → Video ${(i % videos.length) + 1}`
    );
  }

  console.log('✅ All lessons updated with randomized video distribution!');
}

updateLessons()
  .catch((e) => {
    console.error('❌ Error updating lessons:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
