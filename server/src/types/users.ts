export interface IUserForm {
  firstName:string
  lastName:string
  userName:string
  password:string
  email:string
  image:string
}

export interface IUser extends IUserForm{
  _id:string
  createdAt: Date
  updatedAt: Date
}

export interface IUserLoginForm {
  email:string
  password:string
}