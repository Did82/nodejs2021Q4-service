import dotenv from 'dotenv';

import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT, NODE_ENV, POSTGRES_DB, JWT_SECRET_KEY, AUTH_MODE, SALT } =
  process.env;
