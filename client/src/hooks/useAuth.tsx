// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { IAuth } from "../interfaces/global";
import { getTokenAndPayload } from "../utils/utils";

const useAuth = () => {
  const [auth, setAuth] = useState<IAuth>({ token: null, userPayload: null });

  useEffect(() => {
    const { token, userPayload } = getTokenAndPayload();
    if (token) {
      setAuth({ token, userPayload });
    }
  }, []);

  return { auth, setAuth };
};

export default useAuth;