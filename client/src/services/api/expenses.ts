import axios from "axios";
import { IExpenseForm, IExpenseResponse, ISingleExpenseResponse } from "../../interfaces/expense";
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

export const getAllExpenses = async () => {
  const {token} = getTokenAndPayload();
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

export const deleteExpenseById = async (id:string) => {
  const {token} = getTokenAndPayload();
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return res.data as IExpenseResponse;
  } catch (error) {
    console.error(error);
  }
}

export const getExpenseById = async (id:string) => {
  const {token} = getTokenAndPayload();
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return res.data as ISingleExpenseResponse;
  } catch (error) {
    console.error(error);
  }
}

export const updateExpenseById = async (id:string, body:IExpenseForm) => {
  const {token} = getTokenAndPayload();
  try {
    const res = await axios.put(`${BASE_URL}/${id}`,body, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return res.data as IExpenseResponse;
  } catch (error) {
    console.error(error);
  }

}