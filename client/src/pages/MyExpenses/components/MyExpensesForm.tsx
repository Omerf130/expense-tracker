import { IExpenseForm } from "../../../interfaces/expense"

interface MyExpensesFormProps {
  expenseForm: IExpenseForm
  isEditMode:boolean
  setExpenseForm: React.Dispatch<React.SetStateAction<IExpenseForm>>
  onRadioInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  onToggleFormOpen: (isOpen: boolean) => void
}

const MyExpensesForm = ({expenseForm,isEditMode, setExpenseForm, onRadioInputChange, onSubmit, onToggleFormOpen}:MyExpensesFormProps) => {
  return (
    <form className="my-expense-form" onSubmit={onSubmit}>
            <div className="form-inputs">
              <input
                className="form-input"
                type="text"
                placeholder="Title"
                value={expenseForm.title}
                onChange={(e) =>
                  setExpenseForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <input
                className="form-input"
                type="text"
                placeholder="Category"
                value={expenseForm.category}
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
              value={expenseForm.amount}
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
              <div className="radio-input">
                <label>
                  <input
                    type="radio"
                    name="INVESTMENT"
                    value="INVESTMENT"
                    onChange={onRadioInputChange}
                    checked={expenseForm.expenseType === "INVESTMENT"}
                  />
                  <span>Investment</span>
                </label>
              </div>
              <div className="radio-input">
                <label>
                  <input
                    type="radio"
                    name="SAVINGS"
                    value="SAVINGS"
                    onChange={onRadioInputChange}
                    checked={expenseForm.expenseType === "SAVINGS"}
                  />
                  <span>Savings</span>
                </label>
              </div>
            </div>
            <div className="action-btns">
              <input className="action-btn" type="submit" value={isEditMode ? "Edit" : "Create"} />
              <button
                className="action-btn"
                onClick={() => onToggleFormOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
  )
}

export default MyExpensesForm