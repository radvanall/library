import React, { useState } from "react";
import styles from "./CustomSearch.module.scss";
const CustomSearch = ({ name, id, submit }) => {
  const [inputValue, setInputValue] = useState("");
  const changeValue = (event) => {
    let value = event.target.value;
    setInputValue(value);
  };
  const clearInput = () => {
    setInputValue("");
  };
  const submitValue = () => {
    let value = inputValue.trim();
    submit(value);
  };
  return (
    <div className={styles.custom_search__container}>
      <input
        type="text"
        name={name ? name : "custom__search"}
        id={id ? id : "id0"}
        value={inputValue}
        onChange={changeValue}
      />
      <button className={styles.refresh__search_bar} onClick={clearInput}>
        &#10005;
      </button>
      <button title="Search" onClick={submitValue}>
        Search
      </button>
    </div>
  );
};

export default CustomSearch;
