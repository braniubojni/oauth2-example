import { config } from 'dotenv';
config();
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import passport from 'passport';

const app = express();

(async () => {
  try {
    const PORT = process.env.PORT;
    app.use(bodyParser.json());

    app.use(passport.initialize());

    app.use('/api/auth/', authRoutes);

    app.listen(PORT, () => console.log(`Server at ${PORT}`));
  } catch (e) {
    console.log(e, 'err');
  }
})();
