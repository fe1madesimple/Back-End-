import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'express-async-errors'; // Handles async errors automatically
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { errorHandler, notFoundHandler } from '@/shared/middleware/errorHandler';
import requestLogger from './shared/middleware/requestLogger';
import logger from '@/utils/logger';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/config';
import authRouter from './modules/auth/routes/auth.routes';
import userRouter from './modules/user/routes/user.routes';
import subjectRouter from './modules/subjects/routes/subject.routes';

import subscriptionRouter from './modules/subscription/routes/subscription.routes';
import { config } from 'dotenv';
import { configureGoogleStrategy } from './modules/auth/strategies/google.strategy';
import passport from 'passport';

// let swaggerSpec: any;

// try {
//   const swaggerModule = require('./swagger/config');
//   swaggerSpec = swaggerModule.swaggerSpec;
//   console.log('✅ SwaggerSpec loaded successfully');
// } catch (error) {
//   console.error('❌ SwaggerSpec loading failed:', error);
//   swaggerSpec = null;
// }

config();

/**
 * Create Express Application
 */
const createApp = (): Application => {
  const app: Application = express();

  if (process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
      profilesSampleRate: 1.0,
    });

    logger.info('Sentry initialized', {
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1',
    });
  }

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Compression
  app.use(compression());

  const corsOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (corsOrigins.includes(origin) || corsOrigins.includes('*')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production',
      crossOriginEmbedderPolicy: false,
    })
  );

  logger.info('Security middleware (Helmet) enabled'); // ← Add this

  logger.info('CORS enabled', { allowedOrigins: corsOrigins }); // ← Add this

  logger.info('Body parsers enabled', { limit: '10mb' }); // ← Add this

  logger.info('Response compression enabled');

  app.use(passport.initialize());
  configureGoogleStrategy();

  app.use(requestLogger);

  /**
   * @swagger
   * /:
   *   get:
   *     summary: API Welcome
   *     description: Welcome message and API information
   *     tags: [General]
   *     responses:
   *       200:
   *         description: API information
   */
  app.get('/', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to FE-1 Made Simple API',
      version: '1.0.0',
      documentation: '/api-docs',
      health: '/health',
      environment: process.env.NODE_ENV || 'development',
    });
  });

  logger.info('Root endpoint registered at /');

  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Health check
   *     description: Check if the server is running and healthy
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Server is healthy
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Server is healthy
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   *                 uptime:
   *                   type: number
   *                   example: 123.456
   *                 environment:
   *                   type: string
   *                   example: development
   *                 version:
   *                   type: string
   *                   example: 1.0.0
   */
  app.get('/health', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    });
  });

  logger.info('Health check endpoint registered at /health');

  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerSpec));

  logger.info('Swagger API documentation available at /api-docs');
  logger.info('Swagger API documentation available at /api-docs');

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/subscription', subscriptionRouter);
  app.use('/api/v1', subjectRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
