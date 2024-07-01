import React, { useState, useEffect, useRef } from "react";
import styles from "./BookComments.module.scss";
import useGet from "../../api/useGet";
import useGetEven from "../../api/useGetEvent";
import Comment from "../Comment/Comment";
import { ReactComponent as Icon } from "../../images/svg/comment.svg";
import Modal from "../Modal/Modal";
import usePagination from "../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";
import usePost from "../../api/usePost";
import usePut from "../../api/usePut";
import useDelete from "../../api/useDelete";
const BookComments = ({ id }) => {
  const [params, setParams] = useState({ page: 1 });
  const [comments, setCommments] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);

  const { postData, message, setMessage } = usePost("/comments");
  const {
    putData,
    message: editMessage,
    setMessage: setEditMessage,
  } = usePut(`/comments/${commentToEdit?.id ?? -1}`);
  //test inline commits
  const {
    deleteData,
    message: deleteMessage,
    setMessage: setDeleteMessage,
  } = useDelete(`/comments`);
  const { data, isLoading, error } = useGet(`comments/book/${id}`, {}, [
    message,
    deleteMessage,
  ]);
  const [displayComments, setDisplayComments] = useState(false);
  const [comError, setComError] = useState(false);
  const textRef = useRef(null);
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
  useEffect(() => {
    if (comError) {
      setTimeout(() => {
        setComError((prev) => !prev);
      }, 10000);
    }
  }, [comError]);
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(() => "");
      }, 5000);
    }
  }, [message]);
  const {
    pages,
    currentPage,
    changePage,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(params, setParams, data.totalComments || 5, 5);

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
  const postComment = async () => {
    let com = textRef.current.value;
    if (com.length === 0 || com.length > 250) {
      setComError(true);
      return;
    }
    let data = {
      bookId: id,
      userId: 1,
      comment: com,
    };
    await postData(data);
    const res = await getData(params);
    if (!commentError) {
      console.log("par=", params);
      setCommments(res?.data);
      setParams(params);
      setDisplayComments(true);
    }
  };

  const deleteComment = () => {
    textRef.current.value = "";
  };
  const activateModal = (comment) => {
    setCommentToEdit(comment);
    setIsActive(true);
  };
  const changeComment = (event) => {
    setCommentToEdit((prev) => ({ ...prev, comment: event.target.value }));
  };
  const commitChanges = async () => {
    await putData({ comment: commentToEdit.comment });
    setTimeout(() => {
      setEditMessage("");
    }, [6000]);
    let par = {
      totalComments: data.totalComments,
      page: currentPage,
      limit: 3,
      id: id,
    };
    console.log("aprd=", par);
    const res = await getData(par);
    if (!commentError) {
      setCommments(res?.data);
      setParams(params);
      setDisplayComments(true);
    }
  };
  const removeComment = async (cId) => {
    await deleteData(cId);
    let par = {
      totalComments: data.totalComments,
      page: currentPage,
      limit: 3,
      id: id,
    };

    console.log("aprd=", par);
    const res = await getData(par);
    if (!commentError) {
      setCommments(res?.data);
      setParams(params);
      setDisplayComments(true);
      console.log("comments=", res);
    }
    setTimeout(() => {
      setDeleteMessage("");
    }, [6000]);
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
              <textarea
                ref={textRef}
                name=""
                className={styles.comment__aria}
                id=""
                cols="30"
                rows="10"
                placeholder="Leave a comment"
              ></textarea>
              <Modal isActive={isActive} setIsActive={setIsActive}>
                <textarea
                  name=""
                  className={styles.comment__aria}
                  id=""
                  cols="30"
                  rows="10"
                  value={commentToEdit?.comment ?? ""}
                  onChange={changeComment}
                  placeholder="Leave a comment"
                ></textarea>
                <button onClick={commitChanges}>Change</button>
                {editMessage && <p>{editMessage}</p>}
              </Modal>
              <button onClick={postComment}>Post</button>
              <button onClick={deleteComment}>Delete</button>
              {comError && (
                <p className={styles.commentError}>
                  The comment should have between 0 and 250 characters.
                </p>
              )}
              {message && <p className={styles.commentError}>{message}</p>}
              {comments.map((com) => (
                <Comment
                  comment={com}
                  key={com.id}
                  activateModal={activateModal}
                  removeComment={removeComment}
                />
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
