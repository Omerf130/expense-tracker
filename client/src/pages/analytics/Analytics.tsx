import { useEffect, useState } from "react";
import { getExpensesByCategories, getExpensesByExpenseType } from "../../services/api/expenses";
import { ICategories, IExpenseType } from "../../interfaces/expense";
import "./Analytics.scss";
import DoughnutGraph from "./components/DoughnutGraph";
import {BarGraph} from "./components/BarGraph";

const Analytics = () => {
  const [expensesByCategory, setExpensesByCategory] = useState<ICategories[] | null>(null);
  const [expensesByExpenseType, setExpensesByExpenseType] = useState<IExpenseType[] | null>(null)

  useEffect(() => {
    onGetExpensesByCategories();
    onGetExpensesByType();
  }, []);

  const onGetExpensesByCategories = async () => {
    try {
      const data = await getExpensesByCategories();
      data && setExpensesByCategory(data.list);
    } catch (error) {
      console.error(error);
    }
  };

  const onGetExpensesByType = async () => {
    try {
      const data = await getExpensesByExpenseType();
      data && setExpensesByExpenseType(data.list);
    } catch (error) {
      console.error(error)
    }
  }

  if(!expensesByCategory || !expensesByExpenseType) return <p>No Data</p>

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      <DoughnutGraph expensesByCategory={expensesByCategory}/>
      <BarGraph expensesByExpenseType={expensesByExpenseType}/>
    </div>
  );
};

export default Analytics;
