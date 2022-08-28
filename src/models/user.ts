import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export function hashPassword(password: string) {
  return bcrypt.hashSync(
    password + BCRYPT_PASSWORD,
    parseInt(SALT_ROUNDS as string)
  );
}

export type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UsersModel {

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (email, first_name, last_name, password_digest) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name';
      const hashedPassword = hashPassword(user.password);
      const result = await conn.query(sql, [
        user.email,
        user.first_name,
        user.last_name,
        hashedPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, email, first_name, last_name FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT id, email, first_name, last_name FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
