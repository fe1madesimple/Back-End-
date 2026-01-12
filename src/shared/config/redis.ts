import Redis from 'ioredis';
import logger from '@/utils/logger';

/**
 * Redis Client Singleton
 *
 * Provides a single Redis connection pool for the entire application
 */

let redis: Redis | null = null;

const createRedisClient = (): Redis => {
  const client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    reconnectOnError(err) {
      const targetError = 'READONLY';
      if (err.message.includes(targetError)) {
        // Reconnect when Redis is in READONLY mode
        return true;
      }
      return false;
    },
  });

  // Connection events
  client.on('connect', () => {
    logger.info('Redis connected successfully', {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
  });

  client.on('ready', () => {
    logger.info('Redis ready to accept commands');
  });

  client.on('error', (error) => {
    logger.error('Redis connection error', {
      error: error.message,
      stack: error.stack,
    });
  });

  client.on('close', () => {
    logger.warn('Redis connection closed');
  });

  client.on('reconnecting', () => {
    logger.info('Redis reconnecting...');
  });

  client.on('end', () => {
    logger.warn('Redis connection ended');
  });

  return client;
};

// Create Redis client only if REDIS_URL is configured
if (process.env.REDIS_URL) {
  redis = createRedisClient();
} else {
  logger.warn('Redis not configured. Set REDIS_URL environment variable to enable caching.');
}

// Graceful shutdown
process.on('beforeExit', async () => {
  if (redis) {
    await redis.quit();
    logger.info('Redis disconnected');
  }
});

export default redis;
