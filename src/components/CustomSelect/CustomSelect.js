import React, { useState } from "react";
import styles from "./CustomSelect.module.scss";
import { ReactComponent as Arrow } from "../../images/svg/arrow.svg";
const CustomSelect = ({ options, width }) => {
  const [selected, setSelected] = useState({ id: 0, value: "" });
  const [opened, setOpened] = useState(false);
  const changeValue = (event) => {
    setSelected(() => ({ id: 0, value: event.target.value }));
  };
  const selectValue = (event, genre) => {
    setSelected(() => ({ id: event.target.id, value: genre }));
  };
  const openOptions = () => {
    setOpened((prev) => !prev);
  };
  return (
    <div
      className={styles.custom__select__container}
      style={width ? { width: width } : { width: "300px" }}
    >
      <div className={styles.input__container}>
        <input type="text" value={selected.value} onChange={changeValue} />
        <Arrow
          className={
            opened
              ? `${styles.arrow_svg} ${styles.up}
      `
              : `${styles.arrow_svg}`
          }
          onClick={openOptions}
        />
      </div>

      <div
        className={
          opened
            ? `${styles.options} ${styles.closed}
              `
            : `${styles.options}`
        }
      >
        {options.map((item) => (
          <p
            id={item?.id}
            key={item?.id}
            onClick={(event) => selectValue(event, item.genre)}
          >
            {item?.genre}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
