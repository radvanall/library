import React, { useState, useEffect } from "react";
import ImageInput from "../ImageInput/ImageInput";
import styles from "./ChangeCover.module.scss";

const ChangeCover = ({ path, submit, isActive }) => {
  const [value, setValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleSubmit = async () => {
    await submit(value);
  };
  useEffect(() => {
    setValue(null);
    setSelectedImage(null);
  }, [isActive]);
  return (
    <div>
      {selectedImage ? (
        <img src={selectedImage} alt="img" className={styles.img} />
      ) : (
        <img src={path} alt="img" className={styles.img} />
      )}
      <ImageInput
        setValue={setValue}
        setSelectedImage={setSelectedImage}
        id="imgPickerChange"
        imgName={value?.name ?? "select a new cover"}
      />
      <button onClick={handleSubmit}>Save changes</button>
    </div>
  );
};

export default ChangeCover;
