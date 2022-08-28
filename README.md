# **Storefront Backend Project**

This is an API that acts as a middleman between the user interactive section of this store and the database that holds all the information that the user might need to access or create.

## **Getting Started**

To download all the dependencies needed for the project to run you can simply run `yarn` or `npm install` in the terminal.

## **Connecting to the database**

The database runs on the default port **(5432)**.

using psql:

1. Creating the databases:
```postgresql
CREATE DATABASE store_dev;

CREATE DATABASE store_test; -- for tests
```

2. Creating the user:
```postgresql
CREATE USER store_user WITH PASSWORD 'storepassword123';
```

3. Grant user privileges:

```postgresql
GRANT ALL PRIVILEGES ON DATABASE store_dev TO store_user;

GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user;
```

And you're all set.


## **Scripts**

To run the API on your localhost run, the server runs on port **3000**
```
yarn watch
```
or
```
npm run watch
```
To run tests through Jasmine run
```
yarn test
```
or
```
npm run test
```