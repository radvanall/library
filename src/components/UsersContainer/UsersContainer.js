import React from "react";
import styles from "./UsersContainer.module.scss";
import UserRow from "../UserRow/UserRow";
import TitleBar from "../TitleBar/TitleBar";
import { useUsers } from "../../context/UsersContext";
import FilterByRole from "../FilterByRole/FilterByRole";

const UsersContainer = () => {
  const { users, handleRoleFilter } = useUsers();
  return (
    <div className={styles.users__container}>
      <FilterByRole
        handleChange={handleRoleFilter}
        className={styles.filter__box}
      />
      <TitleBar />
      {users &&
        users?.data.map((user) => <UserRow user={user} key={user.id} />)}
    </div>
  );
};

export default UsersContainer;
