import { PrismaClient } from '@prisma/client';
import logger from '@/utils/logger';

/**
 * Prisma Client Singleton
 *
 * Ensures only one instance of Prisma Client exists
 * Prevents connection pool exhaustion in development (hot reload)
 */

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'], // Simple logging to stdout
  });
};

// Use global variable in development to prevent multiple instances
const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Test database connection
prisma
  .$connect()
  .then(() => {
    logger.info('Database connected successfully', {
      database: 'PostgreSQL',
      provider: 'Prisma',
    });
  })
  .catch((error: any) => {
    logger.error('Database connection failed', {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('Database disconnected');
});

export default prisma;