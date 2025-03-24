import { Request, Response } from "express";
import { Expense } from "../db/schemas/Expense";
import { startOfMonth, subMonths } from "date-fns";

export interface AuthRequest extends Request {
  userId?: string;
}

export const getAllExpenses = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const searchQuery = (req.query.search as string) || "";

  try {
    const filter: any = { userId };

    if (searchQuery.trim() !== "") {
      filter.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
    }
    const list = await Expense.find(filter).sort({ createdAt: -1 });

    res
      .status(200)
      .json({ message: "All expenses recieved successfully!", list });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getExpensesByCategories = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.userId;

  try {
    const expensesByCategory = await Expense.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    res
      .status(200)
      .json({
        message: " Categories received successfully",
        list: expensesByCategory,
      });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};


export const getExpensesByexpenseType = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.userId;

  try {
    // Step 1: Get unique expense types for the user
    const expenseTypes = await Expense.distinct("expenseType", { userId });

    // Step 2: Generate last 7 months (month number & year)
    const last7Months = Array.from({ length: 7 }).map((_, i) => {
      const date = subMonths(startOfMonth(new Date()), i);
      return { month: date.getMonth() + 1, year: date.getFullYear() };
    });

    // Step 3: Fetch aggregated expenses
    const expensesByCategory = await Expense.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            expenseType: "$expenseType",
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSum: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      {
        $group: {
          _id: "$_id.expenseType",
          last7Months: {
            $push: {
              month: "$_id.month",
              year: "$_id.year",
              totalSum: "$totalSum",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          expenseType: "$_id",
          last7Months: { $slice: ["$last7Months", 7] },
        },
      },
    ]);

    // Step 4: Ensure all expense types have data for last 7 months
    const formattedExpenses = expenseTypes.map((type) => {
      const categoryData = expensesByCategory.find((c) => c.expenseType === type);
      const existingMonths = categoryData ? categoryData.last7Months : [];

      // Fill missing months with default values
      const filledMonths = last7Months.map(({ month, year }) => {
        const existingEntry = existingMonths.find((e) => e.month === month && e.year === year);
        return existingEntry || { totalSum: 0, month, year };
      });

      return {
        expenseType: type,
        last7Months: filledMonths,
      };
    });

    res.status(200).json({
      message: "Categories received successfully",
      list: formattedExpenses,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    res.status(200).json({ message: "expense recived successfullt!", expense });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createExpense = async (req: AuthRequest, res: Response) => {
  const { title, category, amount, expenseType } = req.body;
  const userId = req.userId;

  try {
    const newExpense = await Expense.create({
      title,
      category,
      amount,
      expenseType,
      userId,
    });
    res
      .status(201)
      .json({
        message: "New expense created succeessfully",
        expense: newExpense,
      });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteExpenseById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const deleteExpense = await Expense.findByIdAndDelete(id);
    const list = await Expense.find({ userId });

    if (!deleteExpense) {
      res.status(404).json({ message: "expense not found" });
      return;
    }
    res.status(200).json({ message: "expense is deleted", list });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateExpenseById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const updateExpense = await Expense.findByIdAndUpdate(id, { ...req.body });
    if (!updateExpense) {
      res.status(404).json({ message: "expense not found" });
      return;
    }
    const list = await Expense.find({ userId });
    res.status(200).json({ message: "expense update succssefuly", list });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
