import passport from 'passport';
import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!
    },
     (
      _accessToken: string,
      _refreshToken: string, // prefixed with _ to silence unused warning
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      return done(null, profile); // Here you can save user to DB if needed
    }
  )
);
export default passport;
