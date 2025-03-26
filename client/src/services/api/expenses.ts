import axios from "axios";
import { ICategoriesResponse, IExpenseForm, IExpenseResponse, IExpenseTypeResponse, ISingleExpenseResponse } from "../../interfaces/expense";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/expenses`;

export const createExpense = async (registerForm: IExpenseForm) => {
  try {
    return await axios.post(`${BASE_URL}/`, registerForm, {
      withCredentials: true
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllExpenses = async (searchInput?: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/${searchInput && `?search=${searchInput}` }`, {
      withCredentials:true
    })
    return res.data as IExpenseResponse;
  } catch (error) {
    console.error(error);
  }
}

export const deleteExpenseById = async (id:string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials:true
    })
    return res.data as IExpenseResponse;
  } catch (error) {
    console.error(error);
  }
}

export const getExpenseById = async (id:string) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      withCredentials:true
    })
    return res.data as ISingleExpenseResponse;
  } catch (error) {
    console.error(error);
  }
}

export const updateExpenseById = async (id:string, body:IExpenseForm) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`,body, {
      withCredentials:true
    })
    return res.data as IExpenseResponse;
  } catch (error) {
    console.error(error);
  }
}

export const getExpensesByCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/categories`, {
      withCredentials:true
    })
    return res.data as ICategoriesResponse;
  } catch (error) {
    console.error(error)
  }
}

export const getExpensesByExpenseType = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/expenseType`, {
      withCredentials:true
    })
    return res.data as IExpenseTypeResponse;
  } catch (error) {
    console.error(error)
  }
}