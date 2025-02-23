import express from "express";
import { register, deleteUserById, getAllUsers, updateUserById, login, logout, getUserById, googleLogin } from "../controllers/Users";
import { requireAdminAuth } from "../middlewares/requireAuth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/googleLogin", googleLogin)
router.get("/",requireAdminAuth, getAllUsers);
router.get("/:id", getUserById)
router.delete("/", deleteUserById);
router.put("/", updateUserById);

export default router;