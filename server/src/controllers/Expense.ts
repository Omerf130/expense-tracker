import { NextFunction, Request, Response } from "express";

export const getAllExpenses = (req:Request, res:Response) => {
  console.log("get request succeded")
}
export const createExpense = (req:Request, res:Response) => {
   console.log("post request succeded")
}
export const deleteExpenseById = (req:Request, res:Response) => {
   console.log("delete request succeded")
}
export const updateExpenseById = (req:Request, res:Response) => {
   console.log("put request succeded")
}