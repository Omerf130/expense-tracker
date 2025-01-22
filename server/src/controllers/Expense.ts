import { NextFunction, Request, Response } from "express";
import { Expense } from "../db/schemas/Expense";

export interface AuthRequest extends Request {
   userId?: string
 }

export const getAllExpenses = async (req:AuthRequest, res:Response) => {
   const userId = req.userId;

   try {
      const list = await Expense.find({userId});
      res.status(200).json({message:"All expenses recieved successfully!", list});
   } catch (error) {
      res.status(400).json({message:error});
   }
}

export const getExpenseById = async (req:Request, res:Response) => {
   const {id} = req.params;
   try {
      const expense = await Expense.find({_id: id}); 
      res.status(200).json({message:"expense recived successfullt!", expense});     
   } catch (error) {
      res.status(400).json({message:error});
   }
}

export const createExpense = async (req:AuthRequest, res:Response) => {
   const {title,category,amount,expenseType} = req.body;
   const userId = req.userId; 

   try {
      const newExpense = await Expense.create({title,category,amount,expenseType, userId});
      res.status(201).json({message:"New expense created succeessfully", expense: newExpense})
   } catch (error) {
      res.status(400).json({message:error});
   }
}

export const deleteExpenseById = async (req:Request, res:Response) => {
   const {id} = req.params;
   try {
      const deleteExpense = await Expense.findByIdAndDelete(id);
      if(!deleteExpense) {
         res.status(404).json({message:"expense not found"});
         return;
      };
      res.status(200).json({message:"expense is deleted", expense:deleteExpense});
   } catch (error) {
      res.status(400).json({message:error})
   }
}

export const updateExpenseById = async (req:Request, res:Response) => {
   const{id} = req.params;
   try {
      const updateExpense = await Expense.findByIdAndUpdate(id, {...req.body})
      res.status(200).json({message:"expense update succssefuly", expense: updateExpense})
      
   } catch (error) {
      res.status(400).json({message:error})
   }
}