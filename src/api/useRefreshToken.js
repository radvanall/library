import api from "./api";
import { useAuthContext } from "../context/AuthContext";
const useRefreshToken = () => {
  const { resetAccessToken, user } = useAuthContext();
  const refresh = async () => {
    const response = await api.get("/users/refresh", {
      withCredentials: true,
    });
    console.log(user.accessToken);
    console.log(response.data.accessToken);
    resetAccessToken(response.data.accessToken);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
