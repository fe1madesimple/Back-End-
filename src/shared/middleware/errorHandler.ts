import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from 'zod';
import * as Sentry from '@sentry/node';
import logger from '@/utils/logger';
import { AppError, ValidationError } from '@/utils/errors';

/**
 * Check if error is a Prisma error (without importing Prisma types)
 */
const isPrismaError = (err: any): boolean => {
  return err.name?.includes('Prisma') || err.code?.startsWith('P');
};

/**
 * Global Error Handler Middleware
 *
 * Catches all errors and sends appropriate responses
 * Logs errors with Winston and reports to Sentry
 */
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): void => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal server error';
  let errors: any[] = [];

  // Extract IP address
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    req.headers['x-real-ip']?.toString() ||
    req.ip ||
    'Unknown';

  // Log error details
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    userId: (req as any).user?.id,
    body: req.body,
    ip,
  });

  // Report to Sentry in production
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.captureException(err, {
      user: {
        id: (req as any).user?.id,
        email: (req as any).user?.email,
      },
      extra: {
        url: req.url,
        method: req.method,
        body: req.body,
        ip,
      },
    });
  }

  // Handle different error types
  if (err instanceof AppError) {
    // Our custom application errors
    statusCode = err.statusCode;
    message = err.message;
    if (err instanceof ValidationError) {
      errors = err.errors;
    }
  } else if (err instanceof ZodError) {
    // Zod validation errors
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    message = 'Validation failed';
    errors = err.issues.map((issue: ZodIssue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
  } else if (isPrismaError(err)) {
    // Prisma errors (handle without importing Prisma types)
    const prismaErr = err as any;
    statusCode = StatusCodes.BAD_REQUEST;

    if (prismaErr.code) {
      switch (prismaErr.code) {
        case 'P2002':
          // Unique constraint violation
          const field = prismaErr.meta?.target?.join(', ') || 'field';
          message = `${field} already exists`;
          break;
        case 'P2025':
          // Record not found
          message = 'Record not found';
          statusCode = StatusCodes.NOT_FOUND;
          break;
        case 'P2003':
          // Foreign key constraint violation
          message = 'Related record not found';
          break;
        case 'P2014':
          // Required relation violation
          message = 'Cannot delete record with existing relations';
          break;
        case 'P2016':
          // Query interpretation error
          message = 'Invalid query parameters';
          break;
        default:
          message = 'Database error occurred';
          logger.warn('Unhandled Prisma error code', {
            code: prismaErr.code,
            meta: prismaErr.meta,
          });
      }
    } else if (err.name === 'PrismaClientValidationError') {
      // Prisma validation errors
      statusCode = StatusCodes.BAD_REQUEST;
      message = 'Invalid data provided';
    } else if (err.name === 'PrismaClientInitializationError') {
      // Database connection error
      statusCode = StatusCodes.SERVICE_UNAVAILABLE;
      message = 'Database connection failed';
      logger.error('Database connection error', { error: err.message });
    }
  } else if (err.name === 'JsonWebTokenError') {
    // JWT errors
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    // JWT expired
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Token expired. Please login again';
  } else if (err.name === 'MulterError') {
    // File upload errors
    statusCode = StatusCodes.BAD_REQUEST;
    message = `File upload error: ${err.message}`;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err.message,
    }),
  });
};

/**
 * 404 Not Found Handler
 * Catches all unmatched routes
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  logger.warn('Route not found', {
    method: req.method,
    url: req.url,
    ip: req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.ip,
  });

  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
};

export default errorHandler;
