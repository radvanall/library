import React, { useState, useRef, useEffect } from "react";
import { useKeyPress } from "../../api/useKeyPress";
import styles from "./MultipleSelect.module.scss";
import CustomSelect from "../CustomSelect/CustomSelect";
import GenreBox from "../GenreBox/GenreBox";

const MultipleSelect = ({ data, newGenres, setNewGenres, width, label }) => {
  const selectRef = useRef();
  const pressEnter = useKeyPress("Enter", selectRef);
  const [selected, setSelected] = useState({ id: 0, value: "" });
  const addGenre = () => {
    const isChoosen = newGenres.findIndex(
      (el) => parseInt(el?.id) === parseInt(selected?.id)
    );
    if (parseInt(selected.id) !== 0 && isChoosen == -1) {
      setNewGenres((prev) => [...prev, { ...selected }]);
    }
  };
  useEffect(() => {
    addGenre();
  }, [pressEnter]);
  const handleChange = (event) => {
    let id = event.target.id;
    setNewGenres((prev) =>
      prev.filter((genre) => parseInt(genre.id) !== parseInt(id))
    );
  };
  return (
    <div ref={selectRef} style={width ? { width: width } : { width: "250px" }}>
      <label>{label}</label>
      <div className={styles.genre__container}>
        {newGenres.length > 0 &&
          newGenres.map((genre) => (
            <GenreBox
              id={genre.id}
              label={genre.value}
              key={genre.id}
              defaultChecked={true}
              onChange={handleChange}
            />
          ))}
      </div>

      {data && (
        <div className={styles.select__container}>
          <CustomSelect
            options={data}
            selected={selected}
            setSelected={setSelected}
            textKey="genre"
            inputId={1}
            width="100%"
            placeholder="Choose a genre:"
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              addGenre(event);
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
