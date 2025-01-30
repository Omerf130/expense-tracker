import { NextFunction, Request, Response } from "express";
import { IUserForm, IUserLoginForm } from "../types/users";
import { User } from "../db/schemas/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getAllUsers = async(req:Request, res:Response) => {
  console.log("get request succeded")
}
export const getUserById = async(req:Request, res:Response) => {
   const {id} = req.params;
   try {
      const user = await User.findById(id);
      res.status(200).json({message:"user recieved successfully", user});
   } catch (error) {
      res.status(400).json({message: error})
   }
}
export const register = async (req:Request, res:Response) => {
   const {password,email} = req.body as IUserForm;
   const saltNumber = 10;

   if(!password || !email) throw Error("password and email are required");

   try {
      const hashedPassword = await bcrypt.hash(password, saltNumber);
      
      const isUserExist = await User.findOne({email});
      if(isUserExist) {
         res.status(400).json({message: "user already exist"});
         return;
      }

      const newUser = await User.create({...req.body, password: hashedPassword});
      res.status(201).json({message: "new user registered", user:newUser});

   } catch (error) {
      res.status(400).json({message: error});
   }
}

export const login = async (req:Request, res:Response): Promise<void> => {
   const { userName, password } = req.body as IUserLoginForm;
   if(!userName || !password) {
      res.status(400).json({message:"userName and password required"});
      return;
   }

   try {
      const user = await User.findOne({userName});
      if(!user) {
         res.status(404).json({message: "user not exist"});
         return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
         res.status(400).json({message:"password incorrect"});
         return;
      }

      const token =  jwt.sign({_id:user._id, role:"basic"}, "dsajdjksadkjsahdas", {expiresIn:"3d"});

      res.cookie("authToken", token, {
         httpOnly: false,
         secure: false,
         sameSite: "strict",
         maxAge: 24 * 60 * 60 *1000,
      }).status(200).json({message:"user logged in successfully", token})

   } catch (error) {
      res.status(400).json({message: error});
   }
}
export const logout = async(req:Request, res:Response) => {
   try {
      res.clearCookie("authToken", {
         httpOnly: false,
         secure: false,
         sameSite: "strict",
         maxAge: 24 * 60 * 60 *1000, 
      }).status(200).json({message:"User loged out successfully"})
   } catch (error) {
      res.status(400).json({message: error});
   }
}
export const deleteUserById = async(req:Request, res:Response) => {
   console.log("delete request succeded")
}
export const updateUserById = async(req:Request, res:Response) => {
   console.log("put request succeded")
}