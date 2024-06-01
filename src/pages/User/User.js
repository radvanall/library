import React from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import useGet from "../../api/useGet";
import UserCard from "../../components/UserCard/UserCard";

const User = () => {
  const { id } = useParams();
  const { data, errorNrComments, isLoadingNrComments } = useGet(`/users/${id}`);
  console.log(data);
  //const { data, error, isLoading } = useGet("/comments/user");
  return (
    <div>
      <UserCard user={data} />
    </div>
  );
};

export default User;
