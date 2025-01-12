import { NextFunction, Request, Response } from "express";
import { Expense } from "../db/schemas/Expense";

export const getAllExpenses = async (req:Request, res:Response) => {
   try {
      const list = await Expense.find();
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