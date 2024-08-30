import { useState } from "react";
import api from "./api";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = (dataUrl) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useAuthContext();
  const navigate = useNavigate();
  const getUser = async (data) => {
    setIsLoading(true);
    try {
      console.log({ data });
      const response = await api.get(dataUrl, {
        params: data,
        withCredentials: true,
      });
      console.log({ response });
      setUserData(response.data);
      navigate(`/user/${response.data.user.id}`);
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
  return { getUser, error, isLoading };
};
export default useLogin;
