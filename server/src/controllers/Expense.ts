import { NextFunction, Request, Response } from "express";
import { Expense } from "../db/schemas/Expense";

export interface AuthRequest extends Request {
   userId?: string
 }

export const getAllExpenses = async (req:AuthRequest, res:Response) => {
   const userId = req.userId;
   const searchQuery = req.query.search as string || "";

   try {
      const filter: any = { userId };

      if (searchQuery.trim() !== "") {
         filter.$or = [
            { title: { $regex: searchQuery, $options: "i" } },
         ];
      }
      const list = await Expense.find(filter);

      res.status(200).json({message:"All expenses recieved successfully!", list});
   } catch (error) {
      res.status(400).json({message:error});
   }
}

export const getExpenseById = async (req:Request, res:Response) => {
   const {id} = req.params;
   try {
      const expense = await Expense.findById(id); 
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

export const deleteExpenseById = async (req:AuthRequest, res:Response) => {
   const {id} = req.params;
   const userId = req.userId;

   try {
      const deleteExpense = await Expense.findByIdAndDelete(id);
      const list = await Expense.find({userId});

      if(!deleteExpense) {
         res.status(404).json({message:"expense not found"});
         return;
      };
      res.status(200).json({message:"expense is deleted", list});
   } catch (error) {
      res.status(400).json({message:error})
   }
}

export const updateExpenseById = async (req:AuthRequest, res:Response) => {
   const{id} = req.params;
   const userId = req.userId;

   try {
      const updateExpense = await Expense.findByIdAndUpdate(id, {...req.body});
      if(!updateExpense) {
         res.status(404).json({message:"expense not found"});
         return;
      };
      const list = await Expense.find({userId});
      res.status(200).json({message:"expense update succssefuly", list})
      
   } catch (error) {
      res.status(400).json({message:error})
   }
}