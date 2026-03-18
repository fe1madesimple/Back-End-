import { OAuth2Client } from 'google-auth-library';
import { UnauthorizedError } from './errors';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface GoogleProfile {
  email: string;
  given_name: string;
  family_name: string;
  sub: string; // Google user ID 
  email_verified: boolean;
  picture?: string;
}

/**
 * Verify Google ID token and extract profile
 */
export const verifyGoogleToken = async (token: string): Promise<GoogleProfile> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedError('Invalid Google token');
    }

    if (!payload.email_verified) {
      throw new UnauthorizedError('Google email not verified');
    }

    return {
      email: payload.email!,
      given_name: payload.given_name || '',
      family_name: payload.family_name || '',
      sub: payload.sub,
      email_verified: payload.email_verified,
      picture: payload.picture,
    };
  } catch (error) {
    throw new UnauthorizedError('Failed to verify Google token');
  }
};
