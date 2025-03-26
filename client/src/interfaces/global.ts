import { IExpense } from "./expense";
import { IUserPayload } from "./user";

export type TTheme = "light" | "dark";
export type TLanguage = "he" | "en";

export interface IAuth {
  userPayload: IUserPayload | null
}

export interface OutletContext {
  auth: IAuth
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
  expenses: IExpense[] | null
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[] | null>>
}
