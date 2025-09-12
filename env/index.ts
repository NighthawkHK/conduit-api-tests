import { cleanEnv, str, url, email } from 'envalid';

const env = cleanEnv(process.env, {
  USER_EMAIL: email(),
  USER_PASSWORD: str(),
  USER_USERNAME: str(),
  API_URL: url({ default: 'https://conduit-api.learnwebdriverio.com' }),
});

export default env;