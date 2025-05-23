import mongoose,{ Schema } from "mongoose";
import { IUser } from "../../types/users";

const userSchema = new Schema<IUser>({
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  userName: {type:String, required:true, unique:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:false},
  image: {type:String, required:false},
  role: {type: String}
},{timestamps:true});

export const User = mongoose.model<IUser>("User", userSchema);