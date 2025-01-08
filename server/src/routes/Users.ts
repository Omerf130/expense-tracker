import express from "express";
import { createUser, deleteUserById, getAllUsers, updateUserById } from "../controllers/Users";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.delete("/", deleteUserById);
router.put("/", updateUserById);

export default router;