import { IExpense } from "../../../interfaces/expense";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiCoinsLight } from "react-icons/pi";
import { deleteExpenseById } from "../../../services/api/expenses";
import { CONSTS } from "../../../consts/consts";

interface MyExpensesListProps {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[] | null>>;
  getSingleExpense: (id: string) => Promise<void>
}
const MyExpensesList = ({ expenses, setExpenses, getSingleExpense }: MyExpensesListProps) => {
  const { EDIT_BTN, DELETE_BTN } = CONSTS.EXPENSES;

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (isConfirmed) {
      const data = await deleteExpenseById(id);
      data?.list && setExpenses(data?.list);
    }
  };


  return (
    <div className="my-expense-list">
      {expenses.map(({ _id, title, category, amount }) => (
        <div className="my-expense-item" key={_id}>
          <div className="item-title">{title}</div>
          <div className="item-amount">
            <PiCoinsLight /> {amount} ₪
          </div>
          <div className="item-category">{category}</div>
          <div className="item-btns">
            <button className="btn btn-edit" onClick={() => getSingleExpense(_id)}>
              {EDIT_BTN} <MdOutlineModeEdit />
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDelete(_id)}
            >
              {DELETE_BTN}
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyExpensesList;
