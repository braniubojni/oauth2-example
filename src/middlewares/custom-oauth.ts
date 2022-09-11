import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export const getFromPax8 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId, clientSecret } = req.body;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  if (clientId !== CLIENT_ID || clientSecret !== CLIENT_SECRET)
    throw new Error('Invalid clientId or secret');

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

  if (!access_token || (!token_type && token_type === 'Bearer'))
    throw new Error('Unauthorized');

  console.log(access_token, '<-- access_token\n');
  console.log(token_type, '<-- token_type\n');
  next();
};
