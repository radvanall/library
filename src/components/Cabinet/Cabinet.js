import React from "react";
import styles from "./Cabinet.module.scss";
import stat from "./../../images/static/avatar.jpg";
import { useNavigate } from "react-router-dom";
import useLogout from "../../api/useLogout";
const Cabinet = ({ user }) => {
  const { logout } = useLogout("/users/logout");
  const navigate = useNavigate();
  const avatar = user.avatar
    ? "/images/users/" + user.avatar.split("/").pop()
    : stat;
  const handleClick = () => {
    navigate(`/user/${user.id}`);
  };
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className={styles.avatar} onClick={handleClick}>
      <img src={avatar} alt="#" />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Cabinet;
