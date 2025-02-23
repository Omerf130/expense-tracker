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

export interface IUser extends IRegisterForm {
  _id: string
  role: TRole
  createdAt: Date
  updatedAt: Date
}

export interface IUserPayload {
  _id: string
  role: TRole
}

export interface IUserResponse {
  message: string
  user: IRegisterForm
}
export interface IUsersResponse {
  message: string
  list: IUser[]
}

export interface IGoogleLoginPayload {
  credential: string | undefined
  client_id: string
}

export type TRole = "basic" | "admin";