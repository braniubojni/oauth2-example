import { NextFunction, Request, Router } from 'express';
import passport from 'passport';
import oauth2orize from 'oauth2orize';
import { getFromPax8 } from '../middlewares/custom-oauth';

const router = Router();

const server = oauth2orize.createServer(); // instead of creating server we need 2 request 4 token

router.get('/', (req, res) => {
  res.send(`
    <h1>You are at the home page</h1>
  `);
});

router.post(
  '/url',
  passport.authenticate('clientPassword', {
    successRedirect: '/success',
    failureRedirect: '/unsuccess',
  }),
  (req, res) => {
    console.log('Url worked\n');
  }
);

router.get('/unsuccess', (req, res) => {
  res.send(`
    <h1>Failed to sign in</h1>
  `);
});

router.get('/success', (req, res) => {
  res.send(`
    <h1>Successfully signed in</h1>
  `);
});

export default router;

// function authenticate() {

//   return function (req: Request, res: Response, next: NextFunction) {
//     console.log(req.body);
//     const username: string = req.body?.username;
//     const password: string = req.body?.password;

//     if (!username || !password)
//       throw new Error('Username or Password not found');

//     passport.authenticate('password-grant', {
//       // @ts-ignore
//       username: username,
//       password: password,
//     })(req, res, next);
//   };
// }

// router.post(
//   '/url',
//   passport.authenticate('clientPassword'),
//   server.token(),
//   (req, res) => {
//     console.log('Redirect worked\n');
//     res.redirect('http://www.google.com');
//   }
// );
