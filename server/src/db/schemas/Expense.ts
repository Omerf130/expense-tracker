import mongoose,{ Schema } from "mongoose";
import { IExpenseForm } from "../../types/expense";

const expenseSchema = new Schema<IExpenseForm>({
  title: {type:String, required:true},
  category: {type:String, required:true},
  amount: {type:Number, required:true},
  expenseType: {type:String, required:true}
},{timestamps:true});

export const Expense = mongoose.model<IExpenseForm>("Expense", expenseSchema);