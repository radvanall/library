import React from "react";
import styles from "./TitleBar.module.scss";
const TitleBar = () => {
  return (
    <div className={styles.user__row}>
      <span>Avatar</span>
      <span>Nickname</span>
      <span>Role</span>
      <span>Comments</span>
      <span></span>
    </div>
  );
};

export default TitleBar;
