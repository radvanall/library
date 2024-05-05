import React from "react";
import styles from "./Checkbox.module.scss";
const Checkbox = ({ border, id, label, ...props }) => {
  return (
    <div
      className={styles.checkbox__container}
      style={border ? { border: "1px solid black" } : { border: "" }}
    >
      <input type="checkbox" id={id} {...props} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
