import express from "express";
import { register, deleteUserById, getAllUsers, updateUserById, login, logout } from "../controllers/Users";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.post("/logout", logout)
router.get("/", getAllUsers);
router.delete("/", deleteUserById);
router.put("/", updateUserById);

export default router;