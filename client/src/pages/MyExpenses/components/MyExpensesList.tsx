import { IExpense } from "../../../interfaces/expense"
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiCoinsLight } from "react-icons/pi";


interface MyExpensesListProps {
expenses: IExpense[]
} 
const MyExpensesList = ({expenses}:MyExpensesListProps) => {
  console.log(expenses)

  return (
    <div className="my-expense-list">
      {expenses.map(expense => (
        <div className="my-expense-item" key={expense._id}>
          <div className="item-title">{expense.title}</div>
          <div className="item-amount"><PiCoinsLight/>{expense.amount}₪</div>
          <div className="item-category">{expense.category}</div>
          <div className="item-btns">
            <button className="btn btn-edit">Edit <MdOutlineModeEdit/></button>
            <button className="btn btn-delete">Delete<RiDeleteBin6Line/></button>
          </div>
        
        </div>
      ))}
    </div>
  )
}

export default MyExpensesList