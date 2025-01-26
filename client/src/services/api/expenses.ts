import axios from "axios";
import { IExpenseForm, IExpenseResponse } from "../../interfaces/expense";
import { getTokenAndPayload } from "../../utils/utils";

const BASE_URL = "http://localhost:8080/api/expenses";
const {token} = getTokenAndPayload();

export const createExpense = async (registerForm: IExpenseForm) => {
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

export const getAllExpenses = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return res.data as IExpenseResponse;
  } catch (error) {
    console.error(error);
  }
}