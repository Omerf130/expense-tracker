import express from "express";
import { getAllExpenses, createExpense, deleteExpenseById, updateExpenseById, getExpenseById } from "../controllers/Expense";

const router = express.Router();

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.delete("/:id", deleteExpenseById);
router.put("/:id", updateExpenseById);

export default router;