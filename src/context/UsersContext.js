import { createContext, useContext, useState } from "react";
import useGet from "../api/useGet";

const UsersContext = createContext({});

const UsersProvider = ({ children }) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    role: null,
    searchWord: "",
  });
  const {
    data: users,
    error: usersError,
    isLoading: usersAreLoading,
  } = useGet("users", params, [params]);
  const handleRoleFilter = (e) => {
    const newRole =
      parseInt(e.target.value) === parseInt(1111) ? null : e.target.value;
    console.log(newRole);
    setParams((prev) => ({
      ...prev,
      role: newRole,
    }));
  };
  const handleSearch = (word) => {
    setParams((prev) => ({
      ...prev,
      searchWord: word,
    }));
  };
  const handleReset = () => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      limit: 5,
      searchWord: "",
    }));
  };
  return (
    <UsersContext.Provider
      value={{
        params,
        users,
        handleReset,
        handleSearch,
        setParams,
        handleRoleFilter,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
const useUsers = () => {
  return useContext(UsersContext);
};
export { UsersProvider, useUsers };
