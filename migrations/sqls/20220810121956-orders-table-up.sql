CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  product_ids INTEGER,
  quantity INTEGER,
  user_id INTEGER NOT NULL,
  status VARCHAR(8) NOT NULL
);