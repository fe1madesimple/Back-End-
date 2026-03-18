import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updates = [
    { name: 'Criminal Law', newName: 'Criminal Law', color: '#E6027D' },
    { name: 'Contract Law', newName: 'Contract Law', color: '#FDC300' },
    { name: 'Tort Law', newName: 'Tort Law', color: '#B38513' },
    { name: 'Equity', newName: 'Equity', color: '#63C0F2' },
    { name: 'Land Law', newName: 'Property Law', color: '#5F3EB5' },
    { name: 'EU Law', newName: 'EU Law', color: '#009DDD' },
    { name: 'Constitutional Law', newName: 'Constitutional Law', color: '#961C81' },
    { name: 'Company Law', newName: 'Company Law', color: '#8659FB' },
  ];

  for (const update of updates) {
    const subject = await prisma.subject.findFirst({
      where: { name: update.name },
    });

    if (!subject) {
      console.log(`⚠️  Subject not found: ${update.name}`);
      continue;
    }

    await prisma.subject.update({
      where: { id: subject.id },
      data: {
        name: update.newName,
        slug: update.newName.toLowerCase().replace(/\s+/g, '-'),
        color: update.color,
        progressColor: update.color,
      },
    });

    console.log(`✅  Updated: ${update.name} → ${update.newName} | ${update.color}`);
  }

  console.log('\n✅ All subjects updated successfully');
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
