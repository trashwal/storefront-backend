import client from '../database';

export type Order = {
  id?: number;
  product_ids: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrdersModel {
  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
