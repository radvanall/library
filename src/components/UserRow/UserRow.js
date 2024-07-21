import React from "react";
import { NavLink } from "react-router-dom";
import stat from "../../images/static/avatar.jpg";
import styles from "./UserRow.module.scss";
import roles from "../../roles";
const UserRow = ({ user }) => {
  let avatar = user?.avatar
    ? "/images/users/" + user.avatar.split("/").pop()
    : stat;
  return (
    <div className={styles.user__row}>
      <img src={avatar} alt="#" />
      <span>{user.login}</span>
      <span>{roles[user.role]}</span>
      <span>{user.nrOfComments}</span>
      <NavLink to={`/user/${user.id}`}>Details</NavLink>
    </div>
  );
};

export default UserRow;
