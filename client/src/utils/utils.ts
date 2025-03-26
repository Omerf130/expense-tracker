import { getUserDetails } from "../services/api/user";

export const getTokenAndPayload = async () => {
  const userDetails = await getUserDetails();

  if (userDetails?.user._id) {
    const {_id, role} = userDetails.user;
    try {
      return { userPayload: {_id,role} };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return { userPayload: null };
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
