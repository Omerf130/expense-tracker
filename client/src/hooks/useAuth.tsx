import { useState, useEffect } from "react";
import { IAuth } from "../interfaces/global";
import { getTokenAndPayload } from "../utils/utils";

const useAuth = () => {
  const [auth, setAuth] = useState<IAuth>({ userPayload: null });

  useEffect(() => {
    const fetchAuth = async () => {
      const { userPayload } = await getTokenAndPayload();
      if (userPayload) {
        setAuth({ userPayload });
      }
    };

    fetchAuth();
  }, []);

  return { auth, setAuth };
};

export default useAuth;
