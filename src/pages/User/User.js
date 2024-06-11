import React from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import useGet from "../../api/useGet";
import UserCard from "../../components/UserCard/UserCard";
import UserComments from "../../components/UserComments/UserComments";
import useGetEvent from "../../api/useGetEvent";

const User = () => {
  const { id } = useParams();
  const { data, errorNrComments, isLoadingNrComments } = useGet(`/users/${id}`);
  console.log(data);
  //const { data, error, isLoading } = useGet("/comments/user");
  return (
    <div className={styles.user}>
      <UserCard user={data} />
      <UserComments id={id} />
    </div>
  );
};

export default User;
