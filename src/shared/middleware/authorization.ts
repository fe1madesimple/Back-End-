import { Request, Response, NextFunction } from 'express';
import { UserRole, ROLE_PERMISSIONS } from '@/shared/constants/roles';
import { ForbiddenError } from '@/utils/errors';

/**
 * Check if user has a specific permission
 */
export const hasPermission = (user: any, permission: string): boolean => {
  const permissions = ROLE_PERMISSIONS[user.role as UserRole];
  return permissions ? permissions.includes(permission) : false;
};

/**
 * Middleware: Require specific role(s)
 */
export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ForbiddenError('Authentication required');
    }

    if (roles.includes(req.user.role as UserRole)) {
      next();
    } else {
      throw new ForbiddenError(`Access denied. Required role: ${roles.join(' or ')}`);
    }
  };
};

/**
 * Middleware: Require specific permission
 */
export const requirePermission = (permission: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ForbiddenError('Authentication required');
    }

    if (hasPermission(req.user, permission)) {
      next();
    } else {
      throw new ForbiddenError(`Access denied. Required permission: ${permission}`);
    }
  };
};
