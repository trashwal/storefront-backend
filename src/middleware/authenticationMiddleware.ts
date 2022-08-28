import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      const verified = jwt.verify(token, TOKEN_SECRET as string);
      if (verified) {
        next();
      } else {
        throw new Error(`Invalid token`);
      }
    } else {
      throw new Error(`Missing token`);
    }
  } catch (error) {
    res.status(401).json({
      message: `Unauthorized access`,
    });
  }
};

export default verifyAuthToken;
