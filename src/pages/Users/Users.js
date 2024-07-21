import React, { useContext } from "react";
import { UsersProvider } from "../../context/UsersContext";
import styles from "./Users.module.scss";
import UsersContainer from "../../components/UsersContainer/UsersContainer";
import SearchUsers from "../../components/SearchUsers/SearchUsers";
import UsersFooter from "../../components/UsersFooter/UsersFooter";
const Users = () => {
  return (
    <UsersProvider>
      <div className={styles.container}>
        <SearchUsers className={styles.search} />
        <UsersContainer />
        <UsersFooter />
      </div>
    </UsersProvider>
  );
};

export default Users;
