export interface IExpenseForm {
  title: string
  category: string
  amount: number
  expenseType: ExpenseType
}

export type ExpenseType = "INCOME" | "EXPENSE" | "INVESTMENT" | "SAVINGS";


export interface IExpense extends IExpenseForm {
  _id:string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface IExpenseResponse {
  message: string
  list: IExpense[]
}

export interface ISingleExpenseResponse {
  message: string
  expense: IExpense
}