import axios from "axios";
import { IExpenseForm } from "../../interfaces/expense";
import { getTokenAndPayload } from "../../utils/utils";

const BASE_URL = "http://localhost:8080/api/expenses";

export const createExpense = async (registerForm: IExpenseForm) => {
  const {token} = getTokenAndPayload();
  try {
    return await axios.post(`${BASE_URL}/`, registerForm, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};