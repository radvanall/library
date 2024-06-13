import React, { useState, useEffect } from "react";
import styles from "./UserComments.module.scss";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import useGetEven from "../../api/useGetEvent";
import UComment from "../UComment/UComment";
const UserComments = ({ id, totalComments }) => {
  const [params, setParams] = useState({
    page: 1,
    id,
    totalComments: totalComments,
    limit: 5,
  });
  const [comments, setCommments] = useState(null);
  const {
    getData,
    error: commentError,
    isLoading: commentsAreLoading,
  } = useGetEven(`/comments/user`, params);
  useEffect(() => {
    const getComments = async () => {
      const res = await getData(params);
      if (!commentError) {
        setCommments(res?.data);
        setParams(params);
      }
    };
    if (params?.id) {
      getComments();
    }
  }, [params.page]);
  const {
    pages,
    currentPage,
    changePage,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(params, setParams, totalComments || 5, 5);
  return (
    <div className={styles.user__comments}>
      {comments.map((com) => (
        <UComment comment={com} key={com.commentId} />
      ))}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        next={comments?.next || null}
        previous={comments?.previous || null}
        changePage={changePage}
        toFirstPage={toFirstPage}
        toLastPage={toLastPage}
        toNextPage={toNextPage}
        toPreviousPage={toPreviousPage}
      />
    </div>
  );
};

export default UserComments;
