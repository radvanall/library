import React from "react";
import styles from "./UserCard.module.scss";
import stat from "../../images/static/avatar.jpg";
import roles from "../../roles";
import UserUpdateBlock from "../UserUpdateBlock/UserUpdateBlock";
const UserCard = ({ user, refetch }) => {
  console.log("av=", user.avatar);
  const avatar = user.avatar
    ? "/images/users/" + user.avatar.split("/").pop()
    : stat;

  console.log("av2=", avatar);
  return (
    <div className={styles.user__card}>
      <img className={styles.cover} src={avatar} alt="#" />
      <p> {user.login}</p>
      <p>{roles[user.role]}</p>
      <UserUpdateBlock avatar={avatar} user={user} refetch={refetch} />
    </div>
  );
};

export default UserCard;
