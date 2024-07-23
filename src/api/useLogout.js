import { useState } from "react";
import api from "./api";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = (dataUrl) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteUserData } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(dataUrl, { withCredentials: true });
      console.log({ response });
      deleteUserData();
      navigate(`/`);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setError(null);
      }, [3000]);
    }
  };
  return { logout, error, isLoading };
};
export default useLogout;
