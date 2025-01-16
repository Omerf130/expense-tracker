import axios from "axios";
import { ILoginForm, IRegisterForm } from "../../interfaces/user";

const BASE_URL = "http://localhost:8080/api/users";

export const registerUser = async (registerForm: IRegisterForm) => {
  try {
    return await axios.post(`${BASE_URL}/register`, registerForm);
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (loginForm: ILoginForm) => {
  try {
    return await axios.post(`${BASE_URL}/login`, loginForm);
  } catch (error) {
    console.error(error);
  }
}
