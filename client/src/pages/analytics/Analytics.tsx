import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getExpensesByCategories } from "../../services/api/expenses";
import { ICategories } from "../../interfaces/expense";
import "./Analytics.scss";

const colorsMap = {
  "Housing": {background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)"},
  "Healthcare": {background: "rgba(54, 162, 235, 0.2)", border: "rgba(54, 162, 235, 1)"},
  "Dining Out & Entertainment": {background: "rgba(255, 206, 86, 0.2)", border: "rgba(255, 206, 86, 1)"},
  "Shopping": {background: "rgba(75, 192, 192, 0.2)", border: "rgba(75, 192, 192, 1)"},
  "Fitness & Wellness": {background: "rgba(153, 102, 255, 0.2)", border: "rgba(153, 102, 255, 1)"},
  "Travel & Vacations": {background: "rgba(255, 159, 64, 0.2)", border: "rgba(255, 159, 64, 1)"},
  "Investments": { background: "rgba(0, 123, 255, 0.2)", border: "rgba(0, 123, 255, 1)" }, // Blue  
  "Savings": { background: "rgba(40, 167, 69, 0.2)", border: "rgba(40, 167, 69, 1)" }, // Green  
  "Vehicle Expenses": { background: "rgba(255, 193, 7, 0.2)", border: "rgba(255, 193, 7, 1)" }, // Yellow  
  "Others": { background: "rgba(108, 117, 125, 0.2)", border: "rgba(108, 117, 125, 1)" }, // Gray  
}

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const [expensesByCategory, setExpensesByCategory] = useState<ICategories[] | null>(null);

  const data = {
    labels: expensesByCategory?.map((cateoryItem) => cateoryItem._id),
    datasets: [
      {
        label: "amount: ₪",
        data:   expensesByCategory?.map((categroyItem) => categroyItem.totalAmount), 
        //@ts-ignore
        backgroundColor:(expensesByCategory && expensesByCategory.length > 0) ? expensesByCategory?.map((cateoryItem) => colorsMap[cateoryItem._id].background): "rgba(255,255,255,0.5)",
        //@ts-ignore
        borderColor: (expensesByCategory && expensesByCategory.length > 0) ? expensesByCategory?.map((cateoryItem) => colorsMap[cateoryItem._id].border) : "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    onGetExpensesByCategories();
  }, []);

  const onGetExpensesByCategories = async () => {
    try {
      const data = await getExpensesByCategories();
      data && setExpensesByCategory(data?.list);
    } catch (error) {
      console.error(error);
    }
  };

  if(!expensesByCategory) return <p>No Data</p>

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      <div className="doughnut-wrapper">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Analytics;
