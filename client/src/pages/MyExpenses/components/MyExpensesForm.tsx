import { IExpenseForm, TCategories } from "../../../interfaces/expense";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import {
  FaHome,
  FaBolt,
  FaShoppingCart,
  FaBus,
  FaHeartbeat,
  FaUtensils,
  FaFilm,
  FaTshirt,
  FaDumbbell,
  FaPlane,
  FaMoneyBillWave,
  FaChartLine,
  FaGraduationCap,
  FaGift,
  FaTools,
  FaPaw,
  FaBaby,
  FaCar,
  FaBalanceScale,
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
  { label: "Utilities", value: "Utilities", icon: <FaBolt /> },
  { label: "Groceries", value: "Groceries", icon: <FaShoppingCart /> },
  { label: "Transportation", value: "Transportation", icon: <FaBus /> },
  { label: "Healthcare", value: "Healthcare", icon: <FaHeartbeat /> },
  { label: "Dining Out", value: "Dining Out", icon: <FaUtensils /> },
  { label: "Entertainment", value: "Entertainment", icon: <FaFilm /> },
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
  { label: "Debt Payments", value: "Debt Payments", icon: <FaMoneyBillWave /> },
  {
    label: "Investments & Savings",
    value: "Investments & Savings",
    icon: <FaChartLine />,
  },
  { label: "Education", value: "Education", icon: <FaGraduationCap /> },
  { label: "Gifts & Donations", value: "Gifts & Donations", icon: <FaGift /> },
  { label: "Home Maintenance", value: "Home Maintenance", icon: <FaTools /> },
  { label: "Pets", value: "Pets", icon: <FaPaw /> },
  { label: "Childcare", value: "Childcare", icon: <FaBaby /> },
  { label: "Vehicle Expenses", value: "Vehicle Expenses", icon: <FaCar /> },
  {
    label: "Legal & Professional Services",
    value: "Legal & Professional Services",
    icon: <FaBalanceScale />,
  },
  { label: "Miscellaneous", value: "Miscellaneous", icon: <FaEllipsisH /> },
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
