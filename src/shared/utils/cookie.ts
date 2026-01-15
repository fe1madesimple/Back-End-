import { Response } from 'express';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none' as const, // Changed from 'lax' to 'none' for cross-domain
  domain: process.env.COOKIE_DOMAIN || undefined, // Empty = works everywhere
  path: '/',
};

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  // Set access token (7 days)
  res.cookie('accessToken', accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Set refresh token (30 days)
  res.cookie('refreshToken', refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken', COOKIE_OPTIONS);
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
};
