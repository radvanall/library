import React, { useRef, useState } from "react";
import styles from "./ImageInput.module.scss";

const ImageInput = ({ setValue, setSelectedImage, id, imgName }) => {
  let ref = useRef();
  const handleClick = () => {
    console.log(ref.current.click());
    console.log(ref.current.value);
  };
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      setValue(event.target.files[0]);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className={styles.image__input}>
      <input
        type="file"
        onChange={handleChange}
        name=""
        id={id}
        accept="image/png, image/jpeg"
        ref={ref}
      />
      <button type="button" onClick={handleClick}>
        Select image
      </button>
      <label htmlFor={id}>{imgName}</label>
    </div>
  );
};

export default ImageInput;
