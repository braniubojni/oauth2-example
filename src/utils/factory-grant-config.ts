import { SHA256 } from 'crypto-js';
import { v4 as uuid } from 'uuid';

export const getConfig = () => {
  const codeId = uuid();

  return {
    defaults: {
      origin: process.env.ORIGIN || 'http://localhost:5000/',
    },
    // storyblok: {
    //   key: process.env.CLIENT_ID,
    //   secret: process.env.CLIENT_SECRET,
    //   redirect_uri: process.env.CONFIDENTIAL_CLIENT_REDIRECT_URI,
    //   callback: '/callback',
    //   authorize_url: 'https://app.storyblok.com/oauth/authorize',
    //   access_url: 'https://app.storyblok.com/oauth/token',
    //   oauth: 2,
    //   scope: 'read_content write_content',
    //   custom_params: {
    //     code_challenge: SHA256(codeId).toString(),
    //     code_challenge_method: 'S256',
    //     state: codeId,
    //   },
    // },
  };
};
