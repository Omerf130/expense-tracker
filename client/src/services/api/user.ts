import axios from "axios";
import { IGoogleLoginPayload, ILoginForm, IRegisterForm, IUserDetails, IUserResponse, IUsersResponse, TRole } from "../../interfaces/user";
import { getTokenAndPayload } from "../../utils/utils";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/users`;

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

export const googleLoginUser = async (googlePayload: IGoogleLoginPayload) => {
  try {
    return await axios.post(`${BASE_URL}/googleLogin`, googlePayload,{withCredentials: true});
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

export const getAllUsers = async () => {

  try {
    const res = await axios.get(BASE_URL, {
      withCredentials: true, // ✅ Important: allows cookies to be sent
    });
    return res.data as IUsersResponse
    
  } catch (error) {
    console.error(error);
    
  }
}

export const deleteUserById = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data as IUsersResponse
    
  } catch (error) {
    console.error(error)
  }
}

export const updatedUserRoleById = async (role: TRole, id: string) => {
  try {
    await axios.patch(`${BASE_URL}/${id}`, {role}, {
      withCredentials: true,
    });
    return true;
    
  } catch (error) {
    console.error(error)
  }
}

export const getUserDetails = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/userDetails`, {
      withCredentials: true, // ✅ Important: allows cookies to be sent
    });
   return res.data as IUserDetails
    
  } catch (error) {
    console.error(error);
    
  }
}