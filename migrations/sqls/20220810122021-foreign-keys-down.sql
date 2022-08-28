ALTER TABLE IF EXISTS orders 
DROP CONSTRAINT fk_product_ids;

ALTER TABLE IF EXISTS orders 
DROP CONSTRAINT fk_user_id;

ALTER TABLE IF EXISTS orders_products
DROP CONSTRAINT fk_order_id;

ALTER TABLE IF EXISTS orders_products
DROP CONSTRAINT fk_product_id;