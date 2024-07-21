import React from "react";
import { useUsers } from "../../context/UsersContext";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
const SearchUsers = ({ className }) => {
  const { handleSearch, handleReset } = useUsers();
  return (
    <div className={className}>
      <CustomSearch submit={handleSearch} />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SearchUsers;
