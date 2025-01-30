import express from "express";
import { getAllExpenses, createExpense, deleteExpenseById, updateExpenseById, getExpenseById } from "../controllers/Expense";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

router.get("/",requireAuth, getAllExpenses);
router.get("/:id",requireAuth ,getExpenseById);
router.post("/",requireAuth, createExpense);
router.delete("/:id",requireAuth, deleteExpenseById);
router.put("/:id", updateExpenseById);

export default router;