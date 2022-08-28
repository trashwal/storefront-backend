import app from '../../server';
import supertest from 'supertest';
import { User } from '../../models/user';
import { OrdersModel } from '../../models/order';
import client from '../../database';

const request = supertest(app);

const model = new OrdersModel();
let user_id = '';

describe('Test Orders Model', () => {
  const user = {
    email: 'test2@test.com',
    first_name: 'test',
    last_name: 'user',
    password: 'test123',
  } as unknown as User;

  it('Runs sql query for showing current order by user', async () => {
    const res = await request
      .post('/users')
      .set('Content-type', 'application/json')
      .send(user);
    user_id = res.body.id;
    const conn = await client.connect();
    const sql = `INSERT INTO orders (user_id, status) VALUES (${user_id}, 'active')`;
    const result = await conn.query(sql);
    conn.release();
    const order = await model.show(user_id as unknown as number);
    expect(order.user_id).toBe(user_id as unknown as number);
    expect(order.status).toEqual('active');
  });
});
