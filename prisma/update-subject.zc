import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSubjectColors() {
  console.log('🎨 Updating subject colors...\n');

  const colorMappings = [
    {
      name: 'Criminal Law',
      color: '#FF1493',
      progressColor: '#FF1493',
    },
    {
      name: 'Contract Law',
      color: '#FFC700',
      progressColor: '#FFC700',
    },
    {
      name: 'Tort Law',
      color: '#C9A227',
      progressColor: '#C9A227',
    },
    {
      name: 'Equity',
      color: '#07BFFB',
      progressColor: '#07BFFB',
    },
    {
      name: 'Land Law',
      color: '#E6027D',
      progressColor: '#E6027D',
    },
    {
      name: 'EU Law',
      color: '#00BCD4',
      progressColor: '#00BCD4',
    },
    {
      name: 'Constitutional Law',
      color: '#1E3A8A',
      progressColor: '#1E3A8A',
    },
    {
      name: 'Company Law',
      color: '#7C3AED',
      progressColor: '#7C3AED',
    },
  ];

  for (const mapping of colorMappings) {
    await prisma.subject.update({
      where: { name: mapping.name },
      data: {
        color: mapping.color,
        progressColor: mapping.progressColor,
      },
    });

    console.log(`✅ Updated ${mapping.name}: ${mapping.color}`);
  }

  console.log('\n🎉 All subject colors updated!\n');
}

updateSubjectColors()
  .catch((e) => {
    console.error('❌ Error updating colors:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
