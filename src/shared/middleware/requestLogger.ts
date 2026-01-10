import morgan from 'morgan';
import { morganStream } from '@/utils/logger';

/**
 * Custom Morgan tokens
 */
morgan.token('user-id', (req: any) => {
  return req.user?.id || 'anonymous';
});

morgan.token('real-ip', (req: any) => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.ip ||
    req.connection?.remoteAddress ||
    'Unknown'
  );
});

morgan.token('device-type', (req: any) => {
  const ua = req.headers['user-agent'] || '';
  if (/mobile|android|iphone|ipod/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
});

morgan.token('os', (req: any) => {
  const ua = req.headers['user-agent'] || '';
  if (/windows/i.test(ua)) return 'Windows';
  if (/macintosh|mac os x/i.test(ua)) return 'MacOS';
  if (/linux/i.test(ua)) return 'Linux';
  if (/android/i.test(ua)) return 'Android';
  if (/ios|iphone|ipad/i.test(ua)) return 'iOS';
  return 'Unknown';
});

morgan.token('browser', (req: any) => {
  const ua = req.headers['user-agent'] || '';
  if (/edg/i.test(ua)) return 'Edge';
  if (/chrome/i.test(ua) && !/edg/i.test(ua)) return 'Chrome';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  if (/opera|opr/i.test(ua)) return 'Opera';
  return 'Unknown';
});

morgan.token('body', (req: any) => {
  // Don't log sensitive data
  if (req.body) {
    const sanitized = { ...req.body };
    delete sanitized.password;
    delete sanitized.confirmPassword;
    delete sanitized.token;
    delete sanitized.refreshToken;
    delete sanitized.apiKey;
    return JSON.stringify(sanitized);
  }
  return '-';
});

/**
 * Development Morgan Format
 * Colorized, verbose output for development
 */
export const morganDev = morgan(
  ':method :url :status :response-time ms - :real-ip - :device-type/:os/:browser',
  {
    stream: morganStream,
  }
);

/**
 * Production Morgan Format
 * Structured format with IP, device, and user info
 */
export const morganProd = morgan(
  ':real-ip - :user-id [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms - Device: :device-type OS: :os Browser: :browser',
  {
    stream: morganStream,
    skip: (req, res) => {
      // Don't log health check endpoints
      return req.url === '/health' || req.url === '/metrics';
    },
  }
);

/**
 * Detailed Morgan Format (for debugging)
 * Includes request body, IP, device
 */
export const morganDetailed = morgan(
  ':method :url :status :response-time ms - IP: :real-ip - User: :user-id - Device: :device-type/:os/:browser - Body: :body',
  {
    stream: morganStream,
  }
);

/**
 * Export appropriate morgan middleware based on environment
 */
export const requestLogger = process.env.NODE_ENV === 'production' ? morganProd : morganDev;

export default requestLogger;
