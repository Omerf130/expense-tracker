import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getExpensesByCategories } from "../../services/api/expenses";
import { ICategories } from "../../interfaces/expense";
import "./Analytics.scss";


// interface IColor {

// }
const colorsMap = {
  Housing: {background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)"},
  "Healthcare": {background: "rgba(54, 162, 235, 0.2)", border: "rgba(54, 162, 235, 1)"},
  "Dining Out & Entertainment": {background: "rgba(255, 206, 86, 0.2)", border: "rgba(255, 206, 86, 1)"},
  "Shopping": {background: "rgba(75, 192, 192, 0.2)", border: "rgba(75, 192, 192, 1)"},
  "Fitness & Wellness": {background: "rgba(153, 102, 255, 0.2)", border: "rgba(153, 102, 255, 1)"},
  "Travel & Vacations": {background: "rgba(255, 159, 64, 0.2)", border: "rgba(255, 159, 64, 1)"},
  "Investments": {background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)"},
  "Savings": {background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)"},
  "Vehicle Expenses": {background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)"},
  "Others": {background: "rgba(255, 99, 132, 0.2)", border: "rgba(255, 99, 132, 1)"},
}

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const [expensesByCategory, setExpensesByCategory] = useState<ICategories[] | null>(null);
  if (expensesByCategory && expensesByCategory.length > 0) {
    console.log("First category object:", expensesByCategory[0]);
    console.log("First category ID:", expensesByCategory[0]._id);
    //@ts-ignore
    console.log("Matching color:", colorsMap[expensesByCategory[0]._id].background);
  } else {
    console.log("No expenses data available yet.");
  }

  const data = {
    labels: expensesByCategory?.map((cateoryItem) => cateoryItem._id),
    datasets: [
      {
        label: "#amount",
        data: [12, 19, 3, 5, 2, 3],
        //@ts-ignore
        backgroundColor:(expensesByCategory && expensesByCategory.length > 0) ? expensesByCategory?.map((cateoryItem) => colorsMap[cateoryItem._id].background): "rgba(255,255,255,0.5)",
        //@ts-ignore
        // borderColor:  expensesByCategory?.map((cateoryItem) => colorsMap[cateoryItem._id].border),
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
