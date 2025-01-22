import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface AuthRequest extends Request {
  userId?: string
}


export const requireAuth = (req: AuthRequest, res: Response, next:NextFunction) => {
  const {authorization} = req.headers;

  if(!authorization) {
    res.status(401).json({message: "Authorization required"})
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    //@ts-ignore
    const {_id} = jwt.verify(token,"dsajdjksadkjsahdas")

    req.userId = _id;

    next();
  } catch (error) {
    res.status(401).json({message: "Authorization required"})
  }
}