import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import authService from '../services/auth.service';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`,
      passReqToCallback: true, // Enable request in callback
    },
    async (req, _accessToken, _refreshToken, profile: Profile, done) => {
      try {
        if (!profile.emails || !profile.emails[0]) {
          return done(new Error('No email found from Google'), undefined);
        }

        if (!profile.name) {
          return done(new Error('No name found from Google'), undefined);
        }

        const result = await authService.googleAuth({
          email: profile.emails[0].value,
          given_name: profile.name.givenName || 'User',
          family_name: profile.name.familyName || '',
          sub: profile.id,
        });

        // Store full result in request object
        (req as any).authResult = result;

        // Pass user to passport (fixes TypeScript error)
        done(null, result.user as any);
      } catch (error) {
        done(error as Error, undefined);
      }
    }
  )
);
