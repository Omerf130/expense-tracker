import React, { useState } from "react";
import { ExpenseType, IExpenseForm } from "../../interfaces/expense";
import { IoMdAddCircleOutline } from "react-icons/io";
import "./MyExpenses.scss";

const MyExpenses = () => {
  const initialState: IExpenseForm = {
    title: "",
    category: "",
    amount: 0,
    expenseType: "EXPENSE",
  };
  const [expenseForm, setExpenseForm] = useState<IExpenseForm>(initialState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(expenseForm);
  }

  const onRadioInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setExpenseForm((prev) => ({...prev, expenseType: e.target.value as ExpenseType}));
  }


  return (
    <div className="my-expense-container">
      <>
        {isFormOpen ? (
          <form className="my-expense-form" onSubmit={onSubmit}>
            <div className="form-inputs">
              <input className="form-input" type="text" placeholder="Title" onChange={(e) => setExpenseForm((prev) => ({...prev, title: e.target.value}))}/>
              <input className="form-input" type="text" placeholder="Category" onChange={(e) => setExpenseForm((prev) => ({...prev, category: e.target.value}))}/>
            </div>
            <input className="form-input" type="number" placeholder="Amount" min={0} onChange={(e) => setExpenseForm((prev) => ({...prev, amount: +e.target.value}))}/>
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
              <button className="action-btn" onClick={() => setIsFormOpen(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <button
            className="add-expense-btn"
            onClick={() => setIsFormOpen(true)}
          >
            <IoMdAddCircleOutline/>
            <span>Add New Transaction</span>
          </button>
        )}
      </>
      <div className="my-expense-list">list</div>
    </div>
  );
};

export default MyExpenses;
