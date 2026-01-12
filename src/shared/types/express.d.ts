import { User } from '@prisma/client';

/**
 * Extend Express Request type to include user property
 * This allows TypeScript to recognize req.user in controllers
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        [key: string]: any;
      };
    }
  }
}

export {};
