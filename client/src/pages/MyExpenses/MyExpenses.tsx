import React, { useEffect, useState } from "react";
import { ExpenseType, IExpenseForm } from "../../interfaces/expense";
import { IoMdAddCircleOutline } from "react-icons/io";
import { createExpense, getAllExpenses } from "../../services/api/expenses";
import { useOutletContext } from "react-router";
import { OutletContext } from "../../interfaces/global";
import "./MyExpenses.scss";
import MyExpensesList from "./components/MyExpensesList";
import Loader from "../../components/loader/Loader";

const MyExpenses = () => {
  const initialState: IExpenseForm = {
    title: "",
    category: "",
    amount: 0,
    expenseType: "EXPENSE",
  };
  const [expenseForm, setExpenseForm] = useState<IExpenseForm>(initialState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { expenses, setExpenses } = useOutletContext<OutletContext>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createExpense(expenseForm);
      await updateList();
    } catch (error) {
      console.log(error);
    }
  };

  const onRadioInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseForm((prev) => ({
      ...prev,
      expenseType: e.target.value as ExpenseType,
    }));
  };

  useEffect(() => {
    updateList();
  }, []);

  const updateList = async () => {
    try {
      const data = await getAllExpenses();
      data && setExpenses([...data.list]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(expenses);

  return (
    <div className="my-expense-container">
      <>
        {isFormOpen ? (
          <form className="my-expense-form" onSubmit={onSubmit}>
            <div className="form-inputs">
              <input
                className="form-input"
                type="text"
                placeholder="Title"
                onChange={(e) =>
                  setExpenseForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <input
                className="form-input"
                type="text"
                placeholder="Category"
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </div>
            <input
              className="form-input"
              type="number"
              placeholder="Amount"
              min={0}
              onChange={(e) =>
                setExpenseForm((prev) => ({ ...prev, amount: +e.target.value }))
              }
            />
            <div className="radio-inputs">
              <div className="radio-input">
                <label>
                  <input
                    type="radio"
                    name="INCOME"
                    value="INCOME"
                    onChange={onRadioInputChange}
                    checked={expenseForm.expenseType === "INCOME"}
                  />
                  <span>Income</span>
                </label>
              </div>
              <div className="radio-input">
                <label>
                  <input
                    type="radio"
                    name="EXPENSE"
                    value="EXPENSE"
                    onChange={onRadioInputChange}
                    checked={expenseForm.expenseType === "EXPENSE"}
                  />
                  <span>Expense</span>
                </label>
              </div>
            </div>
            <div className="action-btns">
              <input className="action-btn" type="submit" value="Add" />
              <button
                className="action-btn"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="add-expense-btn"
            onClick={() => setIsFormOpen(true)}
          >
            <IoMdAddCircleOutline />
            <span>Add New Transaction</span>
          </button>
        )}
      </>
      {expenses ? (
        <MyExpensesList expenses={expenses} setExpenses={setExpenses} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MyExpenses;
