export interface IExpenseForm {
  title: string
  category: string
  amount: number
  expenseType: ExpenseType
  userId: string
}

export type ExpenseType = "INCOME" | "EXPENSE" | "INVESTMENT" | "SAVINGS";

export interface IExpense extends IExpenseForm {
  _id:string
  createdAt: Date
  updatedAt: Date
}