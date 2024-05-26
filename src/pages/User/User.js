import React from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";

const User = () => {
  const { id } = useParams();
  return <div>User:{id}</div>;
};

export default User;
