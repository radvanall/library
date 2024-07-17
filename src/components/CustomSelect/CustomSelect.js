import styles from "./CustomSelect.module.scss";
import { ReactComponent as Arrow } from "../../images/svg/arrow.svg";
import { ReactComponent as Tick } from "../../images/svg/tick.svg";
import useCustomSelect from "./useCustomSelect";
const CustomSelect = ({
  options,
  textKey,
  inputId,
  label,
  placeholder,
  selected,
  setSelected,
  width,
}) => {
  const { selectRef, refList, state, changeValue, openOptions, selectValue } =
    useCustomSelect(options, textKey, setSelected);
  return (
    <div
      tabIndex="-1"
      ref={selectRef}
      className={styles.custom__select__container}
      style={width ? { width: width } : { width: "300px" }}
    >
      <label htmlFor={inputId}>{label}</label>
      <div className={styles.input__container}>
        <input
          id={inputId}
          type="text"
          value={selected?.value}
          onChange={changeValue}
          autoComplete="off"
          placeholder={placeholder}
        />
        <Tick
          className={
            selected?.id !== 0
              ? `${styles.tick_svg} ${styles.tick_green}`
              : `${styles.tick_svg}`
          }
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
              parseInt(selected?.id) === parseInt(item?.id)
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
