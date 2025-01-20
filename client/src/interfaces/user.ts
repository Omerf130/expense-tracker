export interface ILoginForm {
  userName:string
  password: string
}

export interface IRegisterForm extends ILoginForm {
  firstName:string
  lastName:string
  email:string
  image:string
}

export interface IUserPayload {
  _id: string
  role: TRole
}

export type TRole = "Basic" | "Admin";