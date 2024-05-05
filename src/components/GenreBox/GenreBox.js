import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./GenreBox.module.scss";

const GenreBox = ({ id, label, ...props }) => {
  return (
    <div className={styles.genre__box}>
      <Checkbox border={false} id={id} label={label} {...props} />
      <label>{5}</label>
    </div>
  );
};

export default GenreBox;
