import { NextFunction, Request, Response } from "express";

export const getAllUsers = (req:Request, res:Response) => {
  console.log("get request succeded")
}
export const createUser = (req:Request, res:Response) => {
   console.log("post request succeded")
}
export const deleteUserById = (req:Request, res:Response) => {
   console.log("delete request succeded")
}
export const updateUserById = (req:Request, res:Response) => {
   console.log("put request succeded")
}