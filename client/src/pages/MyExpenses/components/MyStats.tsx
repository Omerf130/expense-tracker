import { IExpense } from "../../../interfaces/expense";
import { CONSTS } from "../../../consts/consts";
import { useEffect, useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

interface MyStatsProps {
  expenses: IExpense[];
}

const MyStats = ({ expenses }: MyStatsProps) => {
  const { t } = useTranslation();
  const { SUMMARY_TITLE, LEFT_TOTAL } = CONSTS.EXPENSES;
  const [total, setTotal] = useState(0);
  const sum = expenses.reduce((acc, curr) => acc+= curr.amount ,0);
  const totalExpense = expenses
    .filter((curr) => curr.expenseType === "EXPENSE")
    .reduce((acc, curr) => (acc += curr.amount), 0);
  const totalIncome = expenses
    .filter((curr) => curr.expenseType === "INCOME")
    .reduce((acc, curr) => (acc += curr.amount), 0);
  const totalInvestment = expenses
    .filter((curr) => curr.expenseType === "INVESTMENT")
    .reduce((acc, curr) => (acc += curr.amount), 0);
  const totalSavings = expenses
    .filter((curr) => curr.expenseType === "SAVINGS")
    .reduce((acc, curr) => (acc += curr.amount), 0);


  useEffect(() => {
    handleTotal();
  }, [expenses]);

  const handleTotal = () => {
    let totalValue = 0;
    expenses.forEach((curr) => {
      if (curr.expenseType === "EXPENSE") {
        totalValue -= curr.amount;
      } else {
        totalValue += curr.amount;
      }
    });

    setTotal(totalValue);
  };

  return (
    <div className="my-stats-container">
      <div className="my-stats-header">{SUMMARY_TITLE}</div>
      <div className="my-stats-total">
        <div className="total-left">
          <div className="left-title">{LEFT_TOTAL}</div>
          <div className="left-sum">{total}₪</div>
        </div>
        {total && (
          <div className="total-right">
            <div
              className="right right-income"
              style={{ width: `${(totalIncome / sum) * 100}%` }}
            >
              <div className="subtitle">{`Income ${((totalIncome / sum) * 100).toFixed(1)}%`}</div>
            </div>
            <div
              className="right right-expense"
              style={{ width: `${Math.abs((totalExpense / sum) * 100)}%` }}
            >
              <div className="subtitle">{`Expense ${((totalExpense / sum) * 100).toFixed(1)}%`}</div>
            </div>
            <div
              className="right right-investment"
              style={{ width: `${(totalInvestment / sum) * 100}%` }}
            >
              <div className="subtitle">{`Investment ${((totalInvestment / sum) * 100).toFixed(1)}%`}</div>
            </div>
            <div
              className="right right-savings"
              style={{ width: `${(totalSavings / sum) * 100}%` }}
            >
              <div className="subtitle">{`Savings ${((totalSavings / sum) * 100).toFixed(1)}%`}</div>
            </div>
          </div>
        )}
      </div>
      <div className="my-stats-list">
        <div className="list-item">
          <div className="list-title">{t("MYSTATS.Income")}</div>
          <div className="list-sum">{totalIncome}₪ <FaArrowTrendUp color="green"/></div>
        </div>
        <div className="list-item">
          <div className="list-title">{t("MYSTATS.Expense")}</div>
          <div className="list-sum">{totalExpense}₪ <FaArrowTrendDown color="red"/></div>
        </div>
        <div className="list-item">
          <div className="list-title">{t("MYSTATS.Investment")}</div>
          <div className="list-sum">{totalInvestment}₪ <FaArrowTrendUp color="green"/></div>
        </div>
        <div className="list-item">
          <div className="list-title">{t("MYSTATS.Savings")}</div>
          <div className="list-sum">{totalSavings}₪ <FaArrowTrendUp color="green"/></div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
