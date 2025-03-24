import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IExpenseType } from '../../../interfaces/expense';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labelsDict = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

interface BarGraphProps {
  expensesByExpenseType: IExpenseType[];
}

export const BarGraph = ({expensesByExpenseType}:BarGraphProps) => {
  // @ts-ignore
  const labels = expensesByExpenseType[0].last7Months.map((month) => labelsDict[month.month]);
  const data = {
    labels,
    datasets: [
      {
        label: 'Expense',
        data: expensesByExpenseType.find((listItem) => listItem.expenseType === "EXPENSE")?.last7Months.map((month) => month.totalSum),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Income',
        data: expensesByExpenseType.find((listItem) => listItem.expenseType === "INCOME")?.last7Months.map((month) => month.totalSum),
        backgroundColor: 'rgba(40, 167, 69, 1)',
      },
      {
        label: 'Investments',
        data: expensesByExpenseType.find((listItem) => listItem.expenseType === "INVESTMENT")?.last7Months.map((month) => month.totalSum),
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
      },
      {
        label: 'Savings',
        data: expensesByExpenseType.find((listItem) => listItem.expenseType === "SAVINGS")?.last7Months.map((month) => month.totalSum),
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
      },
    ],
  };

  return (
    <div className='bar-wrapper'>
      <Bar options={options} data={data} />
    </div>
  );
}