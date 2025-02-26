import React, { useCallback, useEffect, useRef, useState } from "react";
import { ExpenseType, IExpenseForm } from "../../interfaces/expense";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
} from "../../services/api/expenses";
import { useOutletContext } from "react-router";
import { OutletContext } from "../../interfaces/global";
import "./MyExpenses.scss";
import MyExpensesList from "./components/MyExpensesList";
import Loader from "../../components/loader/Loader";
import MyExpensesForm from "./components/MyExpensesForm";
import MyStats from "./components/MyStats";
import { FaSearch } from "react-icons/fa";
import { debounce } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const MyExpenses = () => {
  const { t } = useTranslation();
  const initialState: IExpenseForm = {
    title: "",
    category: "",
    amount: 0,
    expenseType: "EXPENSE",
  };
  const [expenseForm, setExpenseForm] = useState<IExpenseForm>(initialState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { expenses, setExpenses } = useOutletContext<OutletContext>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateList();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedId) {
        await updateExpenseById(selectedId, expenseForm);
      } else await createExpense(expenseForm);
      await updateList();
      toast.success("Expense Added Successfully");
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

  const updateList = async () => {
    try {
      const searchValue = searchRef.current?.value || "";
      const data = await getAllExpenses(searchValue);
      data && setExpenses([...data.list]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleExpense = async (id: string) => {
    setIsFormOpen(true);
    setIsEditMode(true);
    const data = await getExpenseById(id);
    if (data) {
      const { title, category, amount, expenseType, _id } = data.expense;
      setExpenseForm({ title, category, amount, expenseType });
      setSelectedId(_id);
    }
  };

  const onToggleFormOpen = (isOpen: boolean) => {
    setIsEditMode(false);
    setIsFormOpen(isOpen);
    setExpenseForm(initialState);
  };

  const debouncedUpdateList = useCallback(debounce(updateList), []);

  const onSearchChange = () => {
    debouncedUpdateList();
  };

  return (
    <div className="my-expense-container">
      <div className="my-expense-search">
        <FaSearch size={24} />
        <input
          ref={searchRef}
          className=""
          type="text"
          placeholder="Search..."
          onChange={onSearchChange}
        />
      </div>
      {expenses && <MyStats expenses={expenses} />}
      <>
        {isFormOpen ? (
          <MyExpensesForm
            expenseForm={expenseForm}
            setExpenseForm={setExpenseForm}
            onSubmit={onSubmit}
            onRadioInputChange={onRadioInputChange}
            isEditMode={isEditMode}
            onToggleFormOpen={onToggleFormOpen}
          />
        ) : (
          <button
            className="add-expense-btn"
            onClick={() => onToggleFormOpen(true)}
          >
            <IoMdAddCircleOutline />
            <span>{t("MYEXPENSES.Add New Transaction")}</span>
          </button>
        )}
      </>
      {expenses && expenses.length !== 0 && (
        <MyExpensesList
          expenses={expenses}
          setExpenses={setExpenses}
          getSingleExpense={getSingleExpense}
        />
      )}
    </div>
  );
};

export default MyExpenses;
