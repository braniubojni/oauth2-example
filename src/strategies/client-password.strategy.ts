import axios from 'axios';
import passport from 'passport';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';

const { CLIENT_SECRET, CLIENT_ID } = process.env;

passport.use(
  'clientPassword',
  new ClientPasswordStrategy(async function (clientId, clientSecret, done) {
    const { CLIENT_ID, CLIENT_SECRET } = process.env;
    if (
      (clientId && clientId !== CLIENT_ID) ||
      (clientSecret && clientSecret !== CLIENT_SECRET)
    ) {
      return done('Invalid client id or secret id', false);
    }
    try {
      const {
        data: { access_token, token_type },
      } = await axios({
        url: 'https://login.pax8.com/oauth/token',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
          audience: 'api://p8p.client',
        },
      });
      if (!access_token || (!token_type && token_type === 'Bearer')) {
        done('Unauthorized', false);
      }

      console.log('Successfully signed in');
      done(null, {
				access_token
			});
    } catch (e) {
      done(e);
    }
  })
);

passport.serializeUser((token, done) => {
	done(null, token)
})

passport.deserializeUser((user, done) => {
	console.log(user, "<-- deseri")
	done(null)
})