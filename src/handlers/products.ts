import express, { Request, Response } from 'express';
import { ProductsModel } from '../models/product';
import verifyAuthToken from '../middleware/authenticationMiddleware';

const model = new ProductsModel();

const create = async (req: Request, res: Response) => {
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await model.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(409).json({
      message: `Product with name: '${req.body.name}' already exists`,
    });
  }
};

const index = async (req: Request, res: Response) => {
  const products = await model.index();
  try {
    if (products.length) {
      res.status(200).json(products);
    } else {
      res.status(200).json({
        message: `There are no products to show`,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `There is an issue with your request`
    })
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await model.show(req.params.id as unknown as number);
    if(product) {
      res.status(200).json(product);
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(404).json({
      message: `Product with id: '${req.params.id}' does not exist`,
    });
  }
};

const productsRoutes = (app: express.Application) => {
  app.post('/products', verifyAuthToken, create);
  app.get('/products', index);
  app.get('/products/:id', show);
};

export default productsRoutes;
