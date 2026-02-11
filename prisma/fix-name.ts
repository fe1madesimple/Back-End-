import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixModuleNames() {
  console.log('🔧 Starting module name fixes...\n');

  const modules = await prisma.module.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  let fixedCount = 0;

  for (const module of modules) {
    // Remove "Module 1: ", "Module 2: ", etc. from beginning
    const newName = module.name.replace(/^Module \d+:\s*/i, '');

    // Only update if name changed
    if (newName !== module.name) {
      await prisma.module.update({
        where: { id: module.id },
        data: { name: newName },
      });

      console.log(`✅ Fixed: "${module.name}" → "${newName}"`);
      fixedCount++;
    }
  }

  console.log(`\n✨ Done! Fixed ${fixedCount} module names.`);
}

fixModuleNames()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
