import styles from "./CustomSelect.module.scss";
import { ReactComponent as Arrow } from "../../images/svg/arrow.svg";
import useCustomSelect from "./useCustomSelect";
const CustomSelect = ({ options, textKey, width }) => {
  const { selectRef, refList, state, changeValue, openOptions, selectValue } =
    useCustomSelect(options, textKey);
  return (
    <div
      tabIndex="-1"
      ref={selectRef}
      className={styles.custom__select__container}
      style={width ? { width: width } : { width: "300px" }}
    >
      <div className={styles.input__container}>
        <input
          type="text"
          value={state.selected?.value}
          onChange={changeValue}
        />
        <Arrow
          className={
            state.opened
              ? `${styles.arrow_svg} ${styles.up}
      `
              : `${styles.arrow_svg}`
          }
          onClick={openOptions}
        />
      </div>

      <div
        className={
          state.opened
            ? `${styles.options} 
              `
            : `${styles.options} ${styles.closed}`
        }
      >
        {state?.displayedOptions?.map((item, index) => (
          <p
            className={
              parseInt(state?.selected?.id) === parseInt(item?.id)
                ? `${styles.selected}`
                : ""
            }
            id={item?.id}
            key={item?.id}
            onClick={(event) => selectValue(event, item[textKey], index)}
            ref={(rf) => (refList.current[index] = rf)}
          >
            {item?.[textKey]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
