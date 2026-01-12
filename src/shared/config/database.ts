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
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
  });
};

// Use global variable in development to prevent multiple instances
const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Log Prisma queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e: any) => {
    logger.debug('Prisma Query', {
      query: e.query,
      params: e.params,
      duration: e.duration,
    });
  });
}

// Log Prisma errors
prisma.$on('error', (e: any) => {
  logger.error('Prisma Error', {
    message: e.message,
    target: e.target,
  });
});

// Log Prisma warnings
prisma.$on('warn', (e: any) => {
  logger.warn('Prisma Warning', {
    message: e.message,
  });
});

// Log Prisma info
prisma.$on('info', (e: any) => {
  logger.info('Prisma Info', {
    message: e.message,
  });
});

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
