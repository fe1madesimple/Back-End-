import { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    
    interface User {
      user: {
        id: string;
        email: string;
        fullName: string | null;
        role: string;
        profileColor: string;
        isEmailVerified: boolean;
      };
      accessToken: string;
      refreshToken: string;
      needsOnBoarding: boolean;
      subscription: any
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
