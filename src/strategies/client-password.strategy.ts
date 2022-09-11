import passport from 'passport';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import Clients from '../users/users.db';
const PasswordGrantStrategy = require('passport-oauth2-password-grant');

const { CLIENT_SECRET, CLIENT_ID } = process.env;

passport.use(
  new PasswordGrantStrategy(
    {
      tokenURL: 'http://localhost:4000/oauth2/token',
      clientID: CLIENT_ID,
    },
    function <T, K, F extends Function>(
      accessToken: T,
      refreshToken: T,
      profile: K,
      done: F
    ) {
      done(null, profile);
    }
  )
);
