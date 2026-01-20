import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/utils/errors';
import authService from '../../modules/auth/services/auth.service';
import { setAuthCookies } from '@/utils/cookie';
import { AuthResponse, AuthServiceResponse, TokenPayload } from '../../modules/auth/interfaces/auth.interfaces';

/**
 * Protect routes - Verify access token
 * If expired, try to refresh using refresh token
 */


function formattedUser(user: AuthResponse["user"]): AuthServiceResponse {

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profileColor: user.profileColor,
      isEmailVerified: user.isEmailVerified,
    },
    accessToken: '',
    refreshToken: '',
    needsOnBoarding: false,
  };
}


export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get access token from cookie
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      throw new UnauthorizedError('Access token not found. Please login.');
    }
   
    try {
      // 2. Try to verify access token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as TokenPayload;

      // 3. Get user and attach to request
      const user = await authService.getCurrentUser(decoded.userId);


      req.user = formattedUser(user)

      return next(); // Token valid, continue
    } catch (error: any) {


      // 4. Access token invalid/expired
      if (error.name === 'TokenExpiredError' && refreshToken) {
        // Access token expired, but we have refresh token

        try {
          // 5. Generate new tokens using refresh token
          const newTokens = await authService.refreshToken(refreshToken);

          // 6. Set new cookies
          setAuthCookies(res, newTokens.accessToken, newTokens.refreshToken);

          // 7. Decode new access token to get user
          const decoded = jwt.verify(
            newTokens.accessToken,
            process.env.JWT_SECRET!
          ) as TokenPayload;
          const user = await authService.getCurrentUser(decoded.userId);


          req.user = formattedUser(user);

          return next(); // Tokens refreshed
        } catch (refreshError) {
          // Refresh token also invalid/expired
          throw new UnauthorizedError('Session expired. Please login again.');
        }
      }

      // No refresh token or other JWT error
      throw new UnauthorizedError('Invalid token. Please login again.');
    }
  } catch (error) {
    next(error);
  }
};



/**
 * Optional authentication - Doesn't throw error if no token
 * Used for endpoints that work for both logged-in and guest users
 * To be created as a future implemetations , for situations where you want to give somene a walk arround , and not letting them to do any major action on the app .
 */
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(); // No token, continue as guest
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as TokenPayload;
      const user = await authService.getCurrentUser(decoded.userId);
      req.user = formattedUser(user);
    } catch (error) {
        // Token invalid, continue as guest (don't throw error)
        
        // feature to be added in the nearest future 
    }

    next();
  } catch (error) {
    next(error);
  }
};