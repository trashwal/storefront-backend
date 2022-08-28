import express, { Request, Response } from 'express';
import { OrdersModel } from '../models/order';
import verifyAuthToken from '../middleware/authenticationMiddleware';

const model = new OrdersModel();

const show = async (req: Request, res: Response) => {
  try {
    const order = await model.show(req.params.id as unknown as number);
    if(order) {
      res.status(200).json(order);
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(404).json({
      message: `Pro with id: '${req.params.id}' has no orders`,
    });
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders/:id', verifyAuthToken, show);
};

export default ordersRoutes;
