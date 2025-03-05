import { IExpenseForm, TCategories } from "../../../interfaces/expense";
import { useTranslation } from "react-i18next";
import Select from "react-select";
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

interface MyExpensesFormProps {
  expenseForm: IExpenseForm;
  isEditMode: boolean;
  setExpenseForm: React.Dispatch<React.SetStateAction<IExpenseForm>>;
  onRadioInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onToggleFormOpen: (isOpen: boolean) => void;
}

interface IOption {
  label: string;
  value: TCategories;
  icon?: JSX.Element;
}

const expensesOptions: IOption[] = [
  { label: "Housing", value: "Housing", icon: <FaHome /> },
  { label: "Groceries", value: "Groceries", icon: <FaShoppingCart /> },
  { label: "Healthcare", value: "Healthcare", icon: <FaHeartbeat /> },
  { label: "Dining Out & Entertainment", value: "Dining Out & Entertainment", icon: <FaUtensils /> },
  { label: "Shopping", value: "Shopping", icon: <FaTshirt /> },
  {
    label: "Fitness & Wellness",
    value: "Fitness & Wellness",
    icon: <FaDumbbell />,
  },
  {
    label: "Travel & Vacations",
    value: "Travel & Vacations",
    icon: <FaPlane />,
  },
  {
    label: "Investments",
    value: "Investments",
    icon: <FaChartLine />,
  },
  {
    label: "Savings",
    value: "Savings",
    icon: <FaChartLine />,
  },
  { label: "Home Maintenance", value: "Home Maintenance", icon: <FaTools /> },
  { label: "Vehicle Expenses", value: "Vehicle Expenses", icon: <FaCar /> },
  { label: "Others", value: "Others", icon: <FaEllipsisH /> },
];

const MyExpensesForm = ({
  expenseForm,
  isEditMode,
  setExpenseForm,
  onRadioInputChange,
  onSubmit,
  onToggleFormOpen,
}: MyExpensesFormProps) => {
  const { t } = useTranslation();

  return (
    <form className="my-expense-form" onSubmit={onSubmit}>
      <div className="form-inputs">
        <input
          className="form-input"
          type="text"
          placeholder={t("MYEXPENSEFORM.Title")}
          value={expenseForm.title}
          onChange={(e) =>
            setExpenseForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Select
          options={expensesOptions.map((option) => ({
            value: option.value,
            label: (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {option.icon} {option.label}
              </div>
            ),
          }))}
          onChange={(selectedOption) =>
            setExpenseForm((prev) => ({
              ...prev,
              category: selectedOption?.value || "",
            }))
          }
          placeholder="Select Category"
          className="select-wrapper"
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
        {["INCOME", "EXPENSE", "INVESTMENT", "SAVINGS"].map((type) => (
          <div className="radio-input" key={type}>
            <label>
              <input
                type="radio"
                name={type}
                value={type}
                onChange={onRadioInputChange}
                checked={expenseForm.expenseType === type}
              />
              <span>{t(`MYEXPENSEFORM.${type}`)}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="action-btns">
        <input
          className="action-btn"
          type="submit"
          value={isEditMode ? "Edit" : "Create"}
        />
        <button
          className="action-btn"
          type="button"
          onClick={() => onToggleFormOpen(false)}
        >
          {t("MYEXPENSEFORM.Cancel")}
        </button>
      </div>
    </form>
  );
};

export default MyExpensesForm;
