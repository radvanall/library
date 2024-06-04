import React from "react";
import styles from "./UserCard.module.scss";
import stat from "../../images/static/avatar.jpg";
const UserCard = ({ user }) => {
  return (
    <div className={styles.user__card}>
      {user?.avatar ? (
        <img className={styles.cover} src={user.avatar} alt="#" />
      ) : (
        <img className={styles.cover} src={stat} alt="#" />
      )}
      {user.login}
    </div>
  );
};

export default UserCard;
