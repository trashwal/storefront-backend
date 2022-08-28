import express, { Request, Response } from 'express';
import { UsersModel } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middleware/authenticationMiddleware';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const model = new UsersModel();

const create = async (req: Request, res: Response) => {
  try {
    if (req.body.password) {
      const user = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
      };
      const newUser = await model.create(user);
      const token = jwt.sign(newUser, TOKEN_SECRET as string);
      res.json({ ...newUser, token });
    } else {
      res.status(400).json({
        message: `Password not provided`,
      });
    }
  } catch (err) {
    res.status(409).json({
      message: `User with email: '${req.body.email}' already exists`,
    });
  }
};

const index = async (req: Request, res: Response) => {
  const users = await model.index();
  try {
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(200).json({
        message: `There are no users to show`,
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
    const user = await model.show(req.params.id as unknown as number);
    if(user) {
      res.status(200).json(user);
    } else {
      throw new Error
    }
  } catch (error) {
    res.status(404).json({
      message: `User with id: '${req.params.id}' does not exist`,
    });
  }
};

const usersRoutes = (app: express.Application) => {
  app.post('/users', create);
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
};

export default usersRoutes;
