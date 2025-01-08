import { NextFunction, Request, Response } from "express";
import { Expense } from "../db/schemas/Expense";

export const getAllExpenses = async (req:Request, res:Response) => {
  console.log("get request succeded")
}

export const createExpense = async (req:Request, res:Response) => {
   const {title,category,amount,expenseType} = req.body;

   try {
      const newExpense = await Expense.create({title,category,amount,expenseType});
      res.status(201).json({message:"New expense created succeessfully", expense: newExpense})
   } catch (error) {
      res.status(400).json({message:error});
   }
}

export const deleteExpenseById = async (req:Request, res:Response) => {
   console.log("delete request succeded")
}

export const updateExpenseById = async (req:Request, res:Response) => {
   console.log("put request succeded")
}