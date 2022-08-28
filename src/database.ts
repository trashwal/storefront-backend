import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string),
});

export default client;
