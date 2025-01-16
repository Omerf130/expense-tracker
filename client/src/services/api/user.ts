import axios from "axios";
import { IRegisterForm } from "../../interfaces/user";

const BASE_URL = "http://localhost:8080/api/users";

export const registerUser = async (registerForm: IRegisterForm) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, registerForm);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
