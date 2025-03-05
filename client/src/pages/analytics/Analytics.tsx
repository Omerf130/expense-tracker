import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Analytics.scss";
import { OutletContext } from "../../interfaces/global";
import { useOutletContext } from "react-router";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "#amount",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Analytics = () => {
  const { expenses, setExpenses } = useOutletContext<OutletContext>();
  const totalHousing = expenses?.filter((expense) => expense.category === "Housing").reduce((acc,curr) => acc+= curr.amount,0);


  console.log(totalHousing)
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
