import axios from "axios";
import { ILoginForm, IRegisterForm, IUserResponse } from "../../interfaces/user";
import { getTokenAndPayload } from "../../utils/utils";

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
    return await axios.post(`${BASE_URL}/login`, loginForm,{withCredentials: true});
  } catch (error) {
    console.error(error);
  }
}

export const logoutUser = async () => {
  try {
    return await axios.post(`${BASE_URL}/logout`, null, {withCredentials: true});
  } catch (error) {
    console.error(error);
  }
}

export const getUserById = async (id: string) => {
  const {token} = getTokenAndPayload();
  try {
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })    
  return res.data as IUserResponse;
  } catch (error) {
    console.error(error);
  }
}
