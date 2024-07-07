import React, { useState, useEffect } from "react";
import styles from "./UserComments.module.scss";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import useGetEven from "../../api/useGetEvent";
import usePut from "../../api/usePut";
import useDelete from "../../api/useDelete";
import useGet from "../../api/useGet";
import UComment from "../UComment/UComment";
import Modal from "../Modal/Modal";
const UserComments = ({ id }) => {
  const [comments, setCommments] = useState(null);
  const { data, errorNrComments, isLoadingNrComments } = useGet(
    `/comments/user/${id}`,
    {},
    [comments]
  );
  const [params, setParams] = useState({
    page: 1,
    id,
    totalComments: data?.totalComments || 0,
    limit: 5,
  });

  const [isActive, setIsActive] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const {
    getData,
    error: commentError,
    isLoading: commentsAreLoading,
  } = useGetEven(`/comments/user`, params);

  const {
    putData,
    message: editMessage,
    setMessage: setEditMessage,
  } = usePut(`/comments/${commentToEdit?.commentId ?? -1}`);
  //test inline commits
  const {
    deleteData,
    message: deleteMessage,
    setMessage: setDeleteMessage,
  } = useDelete(`/comments`);
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

  const commitChanges = async () => {
    console.log(commentToEdit);
    await putData({ comment: commentToEdit.comment });
    setTimeout(() => {
      setEditMessage("");
    }, [6000]);
    // let par = {
    //   totalComments: data.totalComments,
    //   page: currentPage,
    //   limit: 3,
    //   id: id,
    // };
    // console.log("aprd=", par);
    const res = await getData(params);
    if (!commentError) {
      setCommments(res?.data);
      setParams(params);
      // setDisplayComments(true);
    }
  };
  const removeComment = async (cId) => {
    await deleteData(cId);

    // console.log("aprd=", par);

    const res = await getData(params);

    if (!commentError) {
      console.log("res=", res);
      setCommments(res?.data);
      // setDisplayComments(true);
      console.log("comments=", res);
    }
    setTimeout(() => {
      setDeleteMessage("");
    }, [6000]);
  };

  const {
    pages,
    currentPage,
    changePage,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(params, setParams, data?.totalComments || 5, 5);

  const activateModal = (comment) => {
    setCommentToEdit(comment);
    setIsActive(true);
  };
  const changeComment = (event) => {
    setCommentToEdit((prev) => ({ ...prev, comment: event.target.value }));
  };
  return (
    <div className={styles.user__comments}>
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
      {comments &&
        comments.map((com) => (
          <UComment
            comment={com}
            key={com.commentId}
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
  );
};

export default UserComments;
