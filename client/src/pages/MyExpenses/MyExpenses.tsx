import React, { useEffect, useState } from "react";
import { ExpenseType, IExpenseForm } from "../../interfaces/expense";
import { IoMdAddCircleOutline } from "react-icons/io";
import { createExpense, getAllExpenses, getExpenseById, updateExpenseById } from "../../services/api/expenses";
import { useOutletContext } from "react-router";
import { OutletContext } from "../../interfaces/global";
import "./MyExpenses.scss";
import MyExpensesList from "./components/MyExpensesList";
import Loader from "../../components/loader/Loader";
import MyExpensesForm from "./components/MyExpensesForm";

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
  const [isEditMode, setIsEditMode]= useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(isEditMode && selectedId) {
        await updateExpenseById(selectedId,expenseForm);
      }else await createExpense(expenseForm);
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

  const getSingleExpense = async (id:string) => {
    setIsFormOpen(true);
    setIsEditMode(true);
    const data = await getExpenseById(id);
    if(data) {
      const {title, category, amount, expenseType, _id} = data.expense;
      setExpenseForm({title,category, amount, expenseType});
      setSelectedId(_id);
    }

  }

  const onToggleFormOpen = (isOpen: boolean) => {
    setIsEditMode(false);
    setIsFormOpen(isOpen);
    setExpenseForm(initialState)
  }

  return (
    <div className="my-expense-container">
      <>
        {isFormOpen ? (
         <MyExpensesForm
         expenseForm={expenseForm}
         setExpenseForm={setExpenseForm}
         onSubmit={onSubmit}
         onRadioInputChange={onRadioInputChange}
         isEditMode={isEditMode}
         onToggleFormOpen={onToggleFormOpen}/>
        ) : (
          <button
            className="add-expense-btn"
            onClick={() => onToggleFormOpen(true)}
          >
            <IoMdAddCircleOutline />
            <span>Add New Transaction</span>
          </button>
        )}
      </>
      {expenses ? (
        <MyExpensesList
         expenses={expenses}
          setExpenses={setExpenses}
           getSingleExpense={getSingleExpense}/>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MyExpenses;