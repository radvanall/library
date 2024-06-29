import React, { Children } from "react";
import styles from "./Modal.module.scss";
const Modal = ({ isActive, setIsActive, children }) => {
  return (
    <div
      className={
        isActive
          ? `${styles.modal__container} ${styles.active}`
          : styles.modal__container
      }
    >
      <div
        className={
          isActive
            ? `${styles.modal__content} ${styles.active}`
            : styles.modal__content
        }
      >
        {children}
        <button onClick={() => setIsActive(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
