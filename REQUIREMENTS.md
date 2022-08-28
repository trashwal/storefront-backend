# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- INDEX: Shows All Products '/products' [GET]
- SHOW: Shows Certain Product '/products/:id' [GET]
- CREATE: Creates New Product 'products' [POST] [token required]
<!-- - [OPTIONAL] Top 5 most popular products  -->
<!-- - [OPTIONAL] Products by category (args: product category) -->

#### Users
- INDEX: Show All Users '/users' [GET] [token required]
- SHOW: Shows Certain User '/users/:id' [GET] [token required]
- CREATE: Creates New User '/users' [POST]

#### Orders
- SHOW: Shows current Order by user '/orders/:id' [GET] [token required]
<!-- - [OPTIONAL] Completed Orders by user (args: user id)[token required] -->

## Data Shapes
#### Product
-  id (Primary key)
- name
- price
<!-- - [OPTIONAL] category -->

  TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    price INTEGER NOT NULL 
    )

#### User
- id (Primary key)
- email
- firstName
- lastName
- password

  TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password_digest CHAR(60) NOT NULL
  )

#### Orders
- id (Primary key)
- id of each product in the order (Foreign key that references the 'id' column in 'orders_products' table)
- quantity of each product in the order
- id of user (Foreign key that references the 'id' column in 'users' table)
- status of order (active or complete)

  TABLE orders (
    id SERIAL PRIMARY KEY,
    product_ids INTEGER,
    quantity INTEGER,
    user_id INTEGER NOT NULL,
    status VARCHAR(8) NOT NULL
  )

#### Products in order
- id (Primary key)
- id of order (Foreign key that references the 'id' column in 'orders' table)
- id of product (Foreign key that refernces the 'id' column in 'products' table)

  TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL
  );