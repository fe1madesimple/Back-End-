import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Initialize Logtail if token is provided
const logtail = process.env.LOGTAIL_SOURCE_TOKEN
  ? new Logtail(process.env.LOGTAIL_SOURCE_TOKEN)
  : null;

/**
 * Custom log format for console output
 */


const consoleFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;

  // Add stack trace if error
  if (stack) {
    msg += `\n${stack}`;
  }

  // Add metadata if present
  if (Object.keys(metadata).length > 0) {
    msg += `\n${JSON.stringify(metadata, null, 2)}`;
  }

  return msg;
});

/**
 * Daily Rotate File Transport Configuration
 */
const createDailyRotateTransport = (level: string, filename: string) => {
  return new DailyRotateFile({
    level,
    dirname: path.join(process.cwd(), 'logs'),
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // Compress old logs
    maxSize: '20m', // Max file size before rotation
    maxFiles: '14d', // Keep logs for 14 days
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),
  });
};

/**
 * Winston Logger Instance
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),
  defaultMeta: {
    service: 'fe1-backend',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [
    // Console transport (pretty format for development)
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat
      ),
    }),

    // Error logs - separate file
    createDailyRotateTransport('error', 'error'),

    // Combined logs - all levels
    createDailyRotateTransport('info', 'combined'),

    // Warning logs - separate file
    createDailyRotateTransport('warn', 'warn'),

    // HTTP logs - separate file for API requests
    createDailyRotateTransport('http', 'http'),
  ],
  // Don't exit on handled exceptions
  exitOnError: false,
});

/**
 * Add Logtail transport if configured (Production)
 */
if (logtail && process.env.NODE_ENV === 'production') {
  logger.add(new LogtailTransport(logtail));
  logger.info('Logtail transport initialized');
}

/**
 * Handle uncaught exceptions
 */
logger.exceptions.handle(
  new DailyRotateFile({
    dirname: path.join(process.cwd(), 'logs'),
    filename: 'exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
  })
);

/**
 * Handle unhandled promise rejections
 */
logger.rejections.handle(
  new DailyRotateFile({
    dirname: path.join(process.cwd(), 'logs'),
    filename: 'rejections-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
  })
);

/**
 * Stream for Morgan HTTP logger
 */
export const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

/**
 * Parse User Agent to extract device info
 */
const parseUserAgent = (userAgent: string) => {
  const ua = userAgent || 'Unknown';

  // Detect device type
  let deviceType = 'Desktop';
  if (/mobile|android|iphone|ipad|ipod/i.test(ua)) {
    deviceType = 'Mobile';
  } else if (/tablet|ipad/i.test(ua)) {
    deviceType = 'Tablet';
  }

  // Detect OS
  let os = 'Unknown';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'MacOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/ios|iphone|ipad/i.test(ua)) os = 'iOS';

  // Detect Browser
  let browser = 'Unknown';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Chrome';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  return { deviceType, os, browser, userAgent: ua };
};

/**
 * Extract IP address from request (handles proxies)
 */
const extractIP = (req: any): string => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    'Unknown'
  );
};

/**
 * Utility functions for structured logging
 */
export const loggerUtils = {
  /**
   * Log user activity
   */
  logUserActivity: (userId: string, action: string, metadata?: object) => {
    logger.info('User activity', {
      userId,
      action,
      ...metadata,
    });
  },

  /**
   * Log API request with IP and device info
   */
  logApiRequest: (
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    req?: any,
    userId?: string
  ) => {
    const ip = req ? extractIP(req) : 'Unknown';
    const userAgent = req?.headers['user-agent'] || 'Unknown';
    const device = parseUserAgent(userAgent);

    logger.http('API request', {
      method,
      url,
      statusCode,
      duration,
      userId,
      ip,
      deviceType: device.deviceType,
      os: device.os,
      browser: device.browser,
      userAgent: device.userAgent,
    });
  },

  /**
   * Log payment event
   */
  logPayment: (
    userId: string,
    amount: number,
    currency: string,
    status: string,
    reference: string,
    req?: any,
    metadata?: object
  ) => {
    const ip = req ? extractIP(req) : 'Unknown';
    const userAgent = req?.headers['user-agent'] || 'Unknown';
    const device = parseUserAgent(userAgent);

    logger.info('Payment event', {
      userId,
      amount,
      currency,
      status,
      reference,
      ip,
      deviceType: device.deviceType,
      os: device.os,
      browser: device.browser,
      ...metadata,
    });
  },

  /**
   * Log AI feedback request
   */
  logAIFeedback: (
    userId: string,
    questionId: string,
    tokensUsed: number,
    req?: any,
    metadata?: object
  ) => {
    const ip = req ? extractIP(req) : 'Unknown';

    logger.info('AI feedback generated', {
      userId,
      questionId,
      tokensUsed,
      ip,
      ...metadata,
    });
  },

  /**
   * Log authentication event with device info
   */
  logAuth: (event: string, req?: any, userId?: string, email?: string, metadata?: object) => {
    const ip = req ? extractIP(req) : 'Unknown';
    const userAgent = req?.headers['user-agent'] || 'Unknown';
    const device = parseUserAgent(userAgent);

    logger.info('Authentication event', {
      event,
      userId,
      email,
      ip,
      deviceType: device.deviceType,
      os: device.os,
      browser: device.browser,
      userAgent: device.userAgent,
      ...metadata,
    });
  },

  /**
   * Log database operation
   */
  logDatabase: (operation: string, model: string, duration: number, metadata?: object) => {
    logger.debug('Database operation', {
      operation,
      model,
      duration,
      ...metadata,
    });
  },

  /**
   * Log security event with IP and device
   */
  logSecurity: (
    event: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    req?: any,
    metadata?: object
  ) => {
    const ip = req ? extractIP(req) : 'Unknown';
    const userAgent = req?.headers['user-agent'] || 'Unknown';
    const device = parseUserAgent(userAgent);

    logger.warn('Security event', {
      event,
      severity,
      ip,
      deviceType: device.deviceType,
      os: device.os,
      browser: device.browser,
      userAgent: device.userAgent,
      ...metadata,
    });
  },
};

export default logger;
