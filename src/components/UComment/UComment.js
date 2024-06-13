import React from "react";
import { NavLink } from "react-router-dom";
import imgHolder from "../../images/static/avatar.jpg";
import styles from "./UComment.module.scss";
const UComment = ({ comment }) => {
  return (
    <div className={styles.comment__container}>
      {comment.bookId ? (
        <NavLink
          to={`/${comment?.bookId}`}
          className={(isActive) => (isActive ? styles.active : "")}
        >
          {comment.login}
        </NavLink>
      ) : (
        <p>inactive title</p>
      )}
      <div className={styles.comment__body}>
        {comment?.cover ? (
          <img className={styles.cover} src={comment.cover} alt="#" />
        ) : (
          <img className={styles.cover} src={imgHolder} alt="#" />
        )}
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default UComment;
