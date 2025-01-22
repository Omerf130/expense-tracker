import { IUserPayload } from "./user";

export type TTheme = "light" | "dark";

export interface IAuth {
  // isAuthenticated: boolean
  token: string | null
  userPayload: IUserPayload | null
}

export interface OutletContext {
  auth: IAuth
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}
