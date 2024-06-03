import React from "react";
import styles from "./UserCard.module.scss";
import stat from "../../images/static/book.png";
const UserCard = ({ user }) => {
  return (
    <div className={styles.user__card}>
      login:{user.login}
      {user?.avatar ? (
        <img className={styles.cover} src={user.avatar} alt="#" />
      ) : (
        <img className={styles.cover} src={stat} alt="#" />
      )}
    </div>
  );
};

export default UserCard;
