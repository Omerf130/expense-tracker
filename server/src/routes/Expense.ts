import express from "express";
import { getAllExpenses, createExpense, deleteExpenseById, updateExpenseById } from "../controllers/Expense";

const router = express.Router();

router.get("/", getAllExpenses);
router.post("/", createExpense);
router.delete("/", deleteExpenseById);
router.put("/", updateExpenseById);

export default router;