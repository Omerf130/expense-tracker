import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/Expense";
import userRoutes from "./routes/Users";
import { mongooseConnect } from "./db/db";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));

mongooseConnect();