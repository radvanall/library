import React from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import useGet from "../../api/useGet";

const User = () => {
  const { id } = useParams();
  const {
    data: nrOfComments,
    errorNrComments,
    isLoadingNrComments,
  } = useGet(`/comments/user/${id}`);
  console.log(nrOfComments);
  //const { data, error, isLoading } = useGet("/comments/user");
  return <div>User:{id}</div>;
};

export default User;
