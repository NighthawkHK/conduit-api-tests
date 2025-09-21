import { cleanEnv, str, url, email } from 'envalid';

const env = cleanEnv(process.env, {
  USER_EMAIL: email({ desc: 'Email for a test user' }),
  USER_PASSWORD: str({ desc: 'Password for a test user' }),
  USER_USERNAME: str({ desc: 'Username for a test user' }),
  API_URL: url({ default: 'https://conduit-api.learnwebdriverio.com' }),
});

export default env;