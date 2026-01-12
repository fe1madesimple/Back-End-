/**
 * User Roles
 */
export enum UserRole {
  STUDENT = 'STUDENT',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
}

/**
 * Role permissions mapping
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.STUDENT]: [
    'content:read',
    'assessment:attempt',
    'ai-feedback:request',
    'case-law:search',
    'analytics:view-own',
    'profile:edit-own',
  ],
  [UserRole.HOST]: [
    'content:read',
    'content:create',
    'content:update',
    'assessment:create',
    'assessment:update',
    'case-law:create',
    'analytics:view-all',
    'announcements:create',
  ],
  [UserRole.ADMIN]: [
    'users:manage',
    'content:manage',
    'assessment:manage',
    'subscriptions:manage',
    'analytics:view-all',
    'system:configure',
  ],
};

export default UserRole;
