export interface IExpenseForm {
  title: string;
  category: TCategories;
  amount: number;
  expenseType: ExpenseType;
}

export type ExpenseType = "INCOME" | "EXPENSE" | "INVESTMENT" | "SAVINGS";
  export type TCategories =
    | ""
    | "Housing"
    // | "Groceries"
    | "Healthcare"
    | "Dining Out & Entertainment"
    | "Shopping"
    | "Fitness & Wellness"
    | "Travel & Vacations"
    | "Investments" 
    | "Savings"
    // | "Home Maintenance"
    | "Vehicle Expenses"
    | "Others";

export interface IExpense extends IExpenseForm {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IExpenseResponse {
  message: string;
  list: IExpense[];
}

export interface ISingleExpenseResponse {
  message: string;
  expense: IExpense;
}

export interface ICategories {
  _id: string;
  count: number;
  totalAmount: number;
}


export interface ICategoriesResponse {
  message: string;
  list: ICategories[];
}

export interface IExpenseTypeResponse {
  message: string
  list: IExpenseType[]
}

export interface IExpenseType {
  expenseType: ExpenseType
  last7Months: ILast7Months[]
}

export interface ILast7Months {
  month:number
  year:number
  totalSum:number
}