export interface IExpenseForm {
  title: string
  category: string
  amount: number
  expenseType: ExpenseType
}

export type ExpenseType = "INCOME" | "EXPENSE";

export interface IExpense extends IExpenseForm {
  _id:string
}