import React, {useState} from 'react'
import { IExpenseForm } from '../../interfaces/expense'

const MyExpenses = () => {
  const initialState:IExpenseForm = {title:"", category:"", amount:0, expenseType:"EXPENSE"};
  const [expenseForm, setExpenseForm] = useState<IExpenseForm>(initialState);
  
  return (
    <div>MyExpenses</div>
  )
}

export default MyExpenses