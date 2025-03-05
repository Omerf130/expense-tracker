import { IExpense, TCategories } from "../../../interfaces/expense";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiCoinsLight } from "react-icons/pi";
import { deleteExpenseById } from "../../../services/api/expenses";
import { toast } from "react-toastify";
import {
  FaHome,
  FaShoppingCart,
  FaHeartbeat,
  FaUtensils,
  FaTshirt,
  FaDumbbell,
  FaPlane,
  FaChartLine,
  FaTools,
  FaCar,
  FaEllipsisH,
} from "react-icons/fa";

const SIZE = 18;

const iconMap: Record<TCategories, JSX.Element> = {
  "": <FaEllipsisH size={SIZE} />,
  Housing: <FaHome size={SIZE}/>,
  Groceries: <FaShoppingCart size={SIZE}/>,
  Healthcare: <FaHeartbeat size={SIZE}/>,
  "Dining Out & Entertainment": <FaUtensils size={SIZE}/>,
  Shopping: <FaTshirt size={SIZE}/>,
  "Fitness & Wellness": <FaDumbbell size={SIZE}/>,
  "Travel & Vacations": <FaPlane size={SIZE}/>,
  "Investments": <FaChartLine size={SIZE}/>,
  "Savings": <FaChartLine size={SIZE}/>,
  "Home Maintenance": <FaTools size={SIZE}/>,
  "Vehicle Expenses": <FaCar size={SIZE}/>,
  Others: <FaEllipsisH size={SIZE}/>,
};

interface MyExpensesListProps {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[] | null>>;
  getSingleExpense: (id: string) => Promise<void>;
}
const MyExpensesList = ({
  expenses,
  setExpenses,
  getSingleExpense,
}: MyExpensesListProps) => {
  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (isConfirmed) {
      const data = await deleteExpenseById(id);
      data?.list && setExpenses(data?.list);
      toast.success("Expense Deleted Successfully");
    }
  };

  return (
    <div className="my-expense-list">
      {expenses.map(({ _id, title, category, amount, expenseType }) => (
        <div
          className={`my-expense-item ${expenseType.toLowerCase()}`}
          key={_id}
        >
          <div className="item-title">{title}</div>
          <div className="item-amount">
            <PiCoinsLight /> {amount} ₪
          </div>
          <div className="item-category">
            <span>{iconMap[category]}</span>
            <span>{category}</span>
          </div>
          <div className="item-type">{expenseType}</div>
          <div className="item-btns">
            <button
              className="btn btn-edit"
              onClick={() => getSingleExpense(_id)}
            >
              <MdOutlineModeEdit />
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDelete(_id)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyExpensesList;
