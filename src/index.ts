import { config } from 'dotenv';
config();
import express from 'express';
import sessions from 'express-session';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import passport from 'passport';
import grant from 'grant-express';
import { getConfig as grantConfig } from './utils/factory-grant-config';
require('./strategies/client-password.strategy');

const app = express();

(async () => {
  try {
    const PORT = process.env.PORT || 5000;
    app.use(bodyParser.json());
    app.use(
      sessions({
        secret:
          process.env.SESSION_SECRET ||
          'thisismysecrctekeyfhrgfgrfrty84fwir767',
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // one day
        resave: false,
      })
    );

    // app.use(grant(grantConfig()));
    app.use(passport.initialize());

    app.use(authRoutes);

    app.listen(PORT, () => console.log(`Server at ${PORT}`));
  } catch (e) {
    console.log(e, 'err');
  }
})();
