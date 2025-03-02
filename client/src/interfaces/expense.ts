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
    | "Utilities"
    | "Groceries"
    | "Transportation"
    | "Healthcare"
    | "Dining Out"
    | "Entertainment"
    | "Shopping"
    | "Fitness & Wellness"
    | "Travel & Vacations"
    | "Debt Payments"
    | "Investments & Savings"
    | "Education"
    | "Gifts & Donations"
    | "Home Maintenance"
    | "Pets"
    | "Childcare"
    | "Vehicle Expenses"
    | "Legal & Professional Services"
    | "Miscellaneous";

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
