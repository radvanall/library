import React, { useState, useEffect } from "react";
import styles from "./BookComments.module.scss";
import useGet from "../../api/useGet";
import useGetEven from "../../api/useGetEvent";
import Comment from "../Comment/Comment";
import { ReactComponent as Icon } from "../../images/svg/comment.svg";
import usePagination from "../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";
const BookComments = ({ id }) => {
  const [params, setParams] = useState({ page: 1 });
  const [comments, setCommments] = useState(null);
  const { data, isLoading, error } = useGet(`comments/book/${id}`);
  const [displayComments, setDisplayComments] = useState(false);
  const {
    getData,
    error: commentError,
    isLoading: commentsAreLoading,
  } = useGetEven(`/comments/book`, params);
  useEffect(() => {
    const getComments = async () => {
      const res = await getData(params);
      if (!commentError) {
        setCommments(res?.data);
        setParams(params);
        setDisplayComments(true);
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
  } = usePagination(params, setParams, data.totalComments || 5, 5);

  //   const {
  //     data: comments,
  //     isLoading: areCommentsLoading,
  //     errorComments,
  //   } = useGet(`/comments/book`, params, [params]);
  //   console.log(comments);
  const loadComments = async () => {
    if (comments) {
      setDisplayComments((prev) => !prev);
      return;
    }
    let par = { totalComments: data.totalComments, page: 1, limit: 3, id: id };
    const res = await getData(par);

    if (!commentError) {
      setCommments(res?.data);
      setParams(par);
      setDisplayComments(true);
    }
  };
  return (
    <div className={styles.comments__container}>
      {isLoading && <p>Is loading</p>}
      {error && <p>Error</p>}

      {data && (
        <div>
          <div className={styles.comment_nr}>
            <Icon className={styles.comment_svg} onClick={loadComments} />
            <p>{data.totalComments}</p>
            {commentsAreLoading && <p>commentsAreLoading</p>}
            {commentError && <p>commentError</p>}
          </div>
          {comments && (
            <div className={displayComments ? "" : styles.closed__comments}>
              {comments.map((com) => (
                <Comment comment={com} key={com.id} />
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
          )}
        </div>
      )}
    </div>
  );
};

export default BookComments;
