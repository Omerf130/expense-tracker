import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/Expense";
import userRoutes from "./routes/Users";
import { mongooseConnect } from "./db/db";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","https://expense-tracker-client-eight-sooty.vercel.app"],
    credentials: true,
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"]
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);

mongooseConnect();
