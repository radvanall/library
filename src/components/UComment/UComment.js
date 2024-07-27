import React from "react";
import { NavLink } from "react-router-dom";
import imgHolder from "../../images/static/book.png";
import styles from "./UComment.module.scss";
import stat from "../../images/static/book.png";
const UComment = ({ comment, activateModal, removeComment }) => {
  const cover = comment?.cover
    ? "/images/books/" + comment.cover.split("/").pop()
    : stat;
  return (
    <div className={styles.comment__container}>
      {comment.bookId ? (
        <NavLink
          to={`/${comment?.bookId}`}
          className={(isActive) => (isActive ? styles.active : "")}
        >
          {comment.title}
        </NavLink>
      ) : (
        <p>inactive title</p>
      )}
      <div className={styles.comment__body}>
        <img className={styles.cover} src={cover} alt="#" />
        {/* {comment?.cover ? (
          <img className={styles.cover} src={comment.cover} alt="#" />
        ) : (
          <img className={styles.cover} src={imgHolder} alt="#" />
        )} */}
        <div className={styles.button__container}>
          <button onClick={() => activateModal(comment)}>Edit</button>
          <button onClick={() => removeComment(comment.commentId)}>
            Delete
          </button>
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default UComment;
