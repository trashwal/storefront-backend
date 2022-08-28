ALTER TABLE IF EXISTS orders 
ADD CONSTRAINT fk_product_ids FOREIGN KEY (product_ids) 
REFERENCES orders_products(id);

ALTER TABLE IF EXISTS orders 
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) 
REFERENCES users(id);

ALTER TABLE IF EXISTS orders_products
ADD CONSTRAINT fk_order_id FOREIGN KEY (order_id) 
REFERENCES orders(id);

ALTER TABLE IF EXISTS orders_products
ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id)
REFERENCES products(id);