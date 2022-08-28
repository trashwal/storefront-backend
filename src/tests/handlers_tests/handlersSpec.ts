import app from '../../server';
import supertest from 'supertest';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import client from '../../database';

const request = supertest(app);
let token = '';
let user_id = '';
let product_id = '';

describe('Endpoint tests', () => {
  const user = {
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'user',
    password: 'test123',
  } as unknown as User;

  const product = {
    name: 'test product',
    price: '123',
  } as unknown as Product;

  describe('Test Users Routes', () => {
    it("Creates user through the users' Create route", async () => {
      const res = await request
        .post('/users')
        .set('Content-type', 'application/json')
        .send(user);
      expect(res.status).toBe(200);
      token = await res.body.token;
      user_id = await res.body.id;
    });

    it("Shows all users through the users' Index route", async () => {
      const res = await request
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("Shows a specific user through the users' Show route", async () => {
      const res = await request
        .get(`/users/${user_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  describe('Test Products Routes', () => {
    it("Creates product through the products' Create route", async () => {
      const res = await request
        .post('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(product);
      expect(res.status).toBe(200);
      product_id = res.body.id;
    });

    it("Shows all products through the products' Index route", async () => {
      const res = await request
        .get('/products')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("Shows a specific product through the products' Show route", async () => {
      const res = await request
        .get(`/products/${product_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  describe('Test Orders Routes', () => {
    it(`Shows current order by user`, async () => {
      const conn = await client.connect();
      const sql = `INSERT INTO orders (user_id, status) VALUES (${user_id}, 'active')`;
      await conn.query(sql);
      conn.release();
      const res = await request
        .get(`/orders/${user_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
