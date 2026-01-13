import dotenv from 'dotenv';
import createApp from './app';
import logger from '@/utils/logger';
import './shared/config/database'; // Triggers database connection

// Load environment variables
dotenv.config();

// Configuration
const PORT = parseInt(process.env.PORT || '5000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Start Server
 */
const startServer = async () => {
  try {
    logger.info('Starting FE-1 Backend Server...', {
      nodeVersion: process.version,
      platform: process.platform,
      pid: process.pid,
    });

    // Create Express app
    const app = createApp();

    // Start listening
    const server = app.listen(PORT, HOST, () => {
      logger.info('Server started successfully', {
        port: PORT,
        host: HOST,
        environment: NODE_ENV,
        nodeVersion: process.version,
        pid: process.pid,
      });

      logger.info('='.repeat(60));
      logger.info(`🚀 FE-1 Backend Server Running`);
      logger.info(`📍 URL: http://${HOST}:${PORT}`);
      logger.info(`📊 Health: http://${HOST}:${PORT}/health`);
      logger.info(`📝 Environment: ${NODE_ENV}`);
      logger.info(`🔧 Node: ${process.version}`);
      logger.info(`💾 PID: ${process.pid}`);
      logger.info('='.repeat(60));
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`, {
        signal,
        uptime: process.uptime(),
      });

      server.close(() => {
        logger.info('HTTP server closed');

        // TODO: Close database connections here when Prisma is set up
        // await prisma.$disconnect();
        // logger.info('Database connections closed');

        // TODO: Close Redis connections here when Redis is set up
        // await redis.quit();
        // logger.info('Redis connections closed');

        logger.info('Graceful shutdown completed successfully');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown due to timeout (10s exceeded)', {
          signal,
        });
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught errors
    process.on('uncaught Exception', (error: Error) => {
      logger.error('Uncaught Exception - Shutting down...', {
        error: error.message,
        stack: error.stack,
        name: error.name,
      });
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      logger.error('Unhandled Promise Rejection - Shutting down...', {
        reason: reason?.message || reason,
        stack: reason?.stack,
        promise: promise.toString(),
      });
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    process.exit(1);
  }
};

// Start the server
startServer();
