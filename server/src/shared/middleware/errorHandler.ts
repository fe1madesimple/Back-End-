import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from 'zod';
import * as Sentry from '@sentry/node';
import { AppError, ValidationError } from '@/utils/errors';
import logger from '@/utils/logger';

// Helper to check if error is a Prisma error
const isPrismaError = (err: any): boolean => {
  return (
    err.name === 'PrismaClientKnownRequestError' ||
    err.name === 'PrismaClientValidationError' ||
    err.name === 'PrismaClientInitializationError' ||
    err.name === 'PrismaClientRustPanicError' ||
    err.name === 'PrismaClientUnknownRequestError'
  );
};



/**
 * Global Error Handler Middleware
 *
 * Catches all errors and sends appropriate responses
 * Logs errors with Winston and reports to Sentry
 */

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
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

    // Check if this error has validation errors attached (from validation middleware)
    if ((err as any).errors) {
      errors = (err as any).errors;
    }

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
    
    // Prisma errors
    const prismaErr = err as any;
    statusCode = StatusCodes.BAD_REQUEST;

    if (prismaErr.code) {
      switch (prismaErr.code) {
        case 'P2002':

          // Unique constraint violation
          const field = prismaErr.meta?.target?.join(', ') || 'field';
          message = `${field} already exists`;
          errors = [
            {
              field: prismaErr.meta?.target?.[0] || 'unknown',
              message: `This ${field} is already taken`,
            },
          ];
          statusCode = StatusCodes.CONFLICT;
          break;

        case 'P2025':

          // Record not found
          message = 'Record not found';
          statusCode = StatusCodes.NOT_FOUND;
          break;

        case 'P2003':

          // Foreign key constraint violation
          message = 'Related record not found';
          statusCode = StatusCodes.BAD_REQUEST;
          errors = [
            {
              field: prismaErr.meta?.field_name || 'relation',
              message: 'The related record does not exist',
            },
          ];
          break;

        case 'P2014':

          // Required relation violation
          message = 'Cannot delete record with existing relations';
          statusCode = StatusCodes.CONFLICT;
          break;

        case 'P2016':
          // Query interpretation error
          message = 'Invalid query parameters';
          statusCode = StatusCodes.BAD_REQUEST;
          break;

        case 'P2021':

          // Table does not exist
          message = 'Database table not found';
          statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
          logger.error('Database schema issue', {
            code: prismaErr.code,
            meta: prismaErr.meta,
          });
          break;

        case 'P2022':

          // Column does not exist
          message = 'Database column not found';
          statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
          logger.error('Database schema issue', {
            code: prismaErr.code,
            meta: prismaErr.meta,
          });
          break;

        case 'P2023':

          // Inconsistent column data
          message = 'Invalid data format';
          statusCode = StatusCodes.BAD_REQUEST;
          break;

        case 'P2024':
          // Connection pool timeout
          message = 'Database connection timeout';
          statusCode = StatusCodes.SERVICE_UNAVAILABLE;
          break;

        case 'P2034':

          // Transaction conflict
          message = 'Transaction failed due to conflict. Please try again';
          statusCode = StatusCodes.CONFLICT;
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
      message = 'Invalid data provided to database';
    } else if (err.name === 'PrismaClientInitializationError') {

      // Database connection error
      statusCode = StatusCodes.SERVICE_UNAVAILABLE;
      message = 'Database connection failed';
      logger.error('Database connection error', { error: err.message });
    } else if (err.name === 'PrismaClientRustPanicError') {

      // Rust panic error (critical)
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      message = 'Critical database error';
      logger.error('Prisma Rust panic', { error: err.message });
    } else if (err.name === 'PrismaClientUnknownRequestError') {

      // Unknown request error
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      message = 'Unknown database error';
      logger.error('Unknown Prisma error', { error: err.message });
    }
  } else if (err.name === 'JsonWebTokenError') {

    // JWT errors
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid token';
    errors = [
      {
        field: 'token',
        message: 'The authentication token is invalid',
      },
    ];
  } else if (err.name === 'TokenExpiredError') {

    // JWT expired
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Token expired. Please login again';
    errors = [
      {
        field: 'token',
        message: 'Your session has expired',
      },
    ];
  } else if (err.name === 'MulterError') {
    // File upload errors
    const multerErr = err as any;
    statusCode = StatusCodes.BAD_REQUEST;

    switch (multerErr.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File is too large';
        errors = [
          {
            field: 'file',
            message: 'The uploaded file exceeds the maximum allowed size',
          },
        ];
        break;

      case 'LIMIT_FILE_COUNT':
        message = 'Too many files';
        errors = [
          {
            field: 'files',
            message: 'You have uploaded too many files',
          },
        ];
        break;

      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        errors = [
          {
            field: 'file',
            message: 'An unexpected file was uploaded',
          },
        ];
        break;

      default:
        message = `File upload error: ${err.message}`;
    }
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
