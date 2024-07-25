import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import useGet from "../../api/useGet";
import UserCard from "../../components/UserCard/UserCard";
import UserComments from "../../components/UserComments/UserComments";
import useGetEvent from "../../api/useGetEvent";

const User = () => {
  const { id } = useParams();
  // const { data, errorNrComments, isLoadingNrComments } = useGet(`/users/${id}`);
  // console.log(data);
  //const { data, error, isLoading } = useGet("/comments/user");
  const [data, setData] = useState({});
  const { getData, error, isLoading } = useGetEvent(`/users/${id}`);
  const fetch = async () => {
    const res = await getData();
    setData(res);
  };

  useEffect(() => {
    fetch();
  }, [id]);
  return (
    <div className={styles.user}>
      {data && <UserCard user={data} refetch={fetch} />}
      {data && <UserComments id={id} />}
    </div>
  );
};

export default User;
