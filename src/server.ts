import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(cors());
app.use(bodyParser.json());

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
