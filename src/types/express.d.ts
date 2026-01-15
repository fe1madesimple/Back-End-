import { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    
    interface User {
      user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        profileColor: string;
        isEmailVerified: boolean;
      };
      accessToken: string;
      refreshToken: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
