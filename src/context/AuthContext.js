import { useContext, createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    login: "",
    avatar: null,
    role: null,
    accessToken: "",
  });
  const setUserData = (data) => {
    setUser({
      ...data.user,
      accessToken: data?.accessToken,
    });
  };
  const resetAccessToken = (data) => {
    setUser((prev) => ({
      ...prev,
      accessToken: data,
    }));
  };
  const deleteUserData = () => {
    setUser({
      id: null,
      login: "",
      avatar: null,
      role: null,
      accessToken: "",
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUserData,
        resetAccessToken,
        deleteUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuthContext };
