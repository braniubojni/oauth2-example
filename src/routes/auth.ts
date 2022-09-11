import { NextFunction, Request, Router } from 'express';
import passport from 'passport';
import oauth2orize from 'oauth2orize';

const router = Router();

const server = oauth2orize.createServer();

function authenticate() {

  return function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const username: string = req.body?.username;
    const password: string = req.body?.password;

    if (!username || !password)
      throw new Error('Username or Password not found');

    passport.authenticate('password-grant', {
      // @ts-ignore
      username: username,
      password: password,
    })(req, res, next);
  };
}

router.get('/oauth2/token', (req, res) => {
  console.log('token OK');
  res.send('ok');
});

router.post(
  '/oauth',
  // @ts-ignore
  authenticate(),
  (req, res) => {
    console.log('Redirect worked\n');
    res.redirect('http://www.google.com');
  }
);

export default router;
