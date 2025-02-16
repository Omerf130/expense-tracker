import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { IUserPayload } from "../interfaces/user";

export const getTokenAndPayload = () => {
  const token = Cookies.get("authToken");
  if (token) {
    try {
      const decoded = jwtDecode<IUserPayload>(token);
      return { token, userPayload: decoded };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return { token: null, userPayload: null };
};

export const debounce = (func: any, delay: number = 1000) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
