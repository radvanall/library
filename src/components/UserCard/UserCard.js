import React from "react";
import styles from "./UserCard.module.scss";
const UserCard = ({ user }) => {
  return <div className={styles.user__card}>login:{user.login}</div>;
};

export default UserCard;
