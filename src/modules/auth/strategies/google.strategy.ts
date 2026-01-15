import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import authService from '../services/auth.service';


console.log(process.env.BACKEND_URL, "from google strategy")
export const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile: Profile, done) => {
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

        
          done(null, result as any); 
        } catch (error) {
          done(error as Error, undefined);
        }
      }
    )
  );
};