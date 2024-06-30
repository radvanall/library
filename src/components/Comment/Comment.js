import React from "react";
import { NavLink } from "react-router-dom";
import imgHolder from "../../images/static/avatar.jpg";
import styles from "./Comment.module.scss";
const Comment = ({ comment, activateModal, removeComment }) => {
  return (
    <div className={styles.comment__container}>
      {comment.user_id ? (
        <NavLink
          to={`/user/${comment?.user_id}`}
          className={(isActive) => (isActive ? styles.active : "")}
        >
          {comment.login}
        </NavLink>
      ) : (
        <p>inactive user</p>
      )}
      <div className={styles.comment__body}>
        {comment?.avatar ? (
          <img className={styles.cover} src={comment.avatar} alt="#" />
        ) : (
          <img className={styles.cover} src={imgHolder} alt="#" />
        )}
        <div className={styles.button__container}>
          <button onClick={() => activateModal(comment)}>Edit</button>
          <button onClick={() => removeComment(comment.id)}>Delete</button>
        </div>

        <p>{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
