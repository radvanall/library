import { useContext, createContext, useState } from "react";

const AuthContext = createContext({});

const setInitialUserData = () => {
  const userData = window.localStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  } else
    return {
      id: null,
      login: "",
      avatar: null,
      role: null,
      accessToken: "",
    };
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(setInitialUserData);
  const setUserData = (data) => {
    let userData = {
      ...data.user,
      accessToken: data?.accessToken,
    };
    setUser(userData);
    window.localStorage.setItem("userData", JSON.stringify(userData));
  };
  const resetAccessToken = (data) => {
    let userData = {
      ...user,
      accessToken: data,
    };
    setUser(userData);
    window.localStorage.setItem("userData", JSON.stringify(userData));
  };
  const deleteUserData = () => {
    setUser({
      id: null,
      login: "",
      avatar: null,
      role: null,
      accessToken: "",
    });
    window.localStorage.removeItem("userData");
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
