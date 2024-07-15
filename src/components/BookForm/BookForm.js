import React, { useState, useEffect } from "react";
import useGet from "../../api/useGet";
import CustomSelect from "../CustomSelect/CustomSelect";
import MultipleSelect from "../MultipleSelect/MultipleSelect";
import ImageInput from "../ImageInput/ImageInput";
import styles from "./BookForm.module.scss";
const BookForm = ({ submitData, initialData, initialGenres, isCreateMode }) => {
  const { data, error, isLoading } = useGet("genres");
  const [errors, setErrors] = useState({
    title: false,
    author: false,
    genres: false,
  });
  const [newGenres, setNewGenres] = useState(
    initialGenres ? initialGenres : []
  );
  const [value, setValue] = useState(null);
  const [inputFields, setInputFields] = useState(
    initialData
      ? initialData
      : {
          title: "",
          author: "",
          desc: "",
        }
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const submit = async (event) => {
    event.preventDefault();
    let er = false;
    if (inputFields.title === "") {
      setErrors((prev) => ({
        ...prev,
        title: true,
      }));
      er = true;
    }
    if (inputFields.author === "") {
      setErrors((prev) => ({
        ...prev,
        author: true,
      }));
      er = true;
    }
    if (newGenres.length === 0) {
      setErrors((prev) => ({
        ...prev,
        genres: true,
      }));
      er = true;
    }
    console.log("errors:", errors);
    if (er) return;
    let genres = newGenres.map((item) => parseInt(item.id));
    let formData = new FormData();
    formData.append("title", inputFields.title);
    formData.append("author", inputFields.author);
    formData.append("desc", inputFields.desc);
    formData.append("genres", JSON.stringify(genres));

    if (isCreateMode) {
      if (value) {
        formData.append("cover", value);
      }
    }
    await submitData(formData);
  };
  let changeInputsHandler = (event) => {
    console.log(inputFields);
    let key = event.target.name;
    let value = event.target.value;
    if (key === "title" || key === "author")
      setErrors((prev) => ({
        ...prev,
        [key]: false,
      }));
    setInputFields((prev) => ({ ...prev, [key]: value }));
  };
  useEffect(() => {
    if (newGenres.length > 0) {
      setErrors((prev) => ({
        ...prev,
        genres: false,
      }));
    }
  }, [newGenres?.length]);

  useEffect(() => {
    setNewGenres(initialGenres || []);
    setInputFields(
      initialData || {
        title: "",
        author: "",
        desc: "",
      }
    );
  }, [initialData, initialGenres]);
  return (
    <div>
      <h2>Add a new book:</h2>
      <div className={styles.content__container}>
        <form style={isCreateMode ? null : { margin: "0 auto" }}>
          <label htmlFor="title">Book's title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={inputFields.title}
            onChange={changeInputsHandler}
          />
          {errors?.title && <p>Enter the name of the book.</p>}
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={inputFields.author}
            onChange={changeInputsHandler}
          />
          {errors?.author && <p>Enter the name of author.</p>}
          <label htmlFor="desc">Description:</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            value={inputFields.desc}
            onChange={changeInputsHandler}
          />
          {isCreateMode && (
            <ImageInput
              setValue={setValue}
              setSelectedImage={setSelectedImage}
              id="imgPicker"
              imgName={value?.name ?? "file not selected"}
            />
          )}

          <MultipleSelect
            data={data}
            newGenres={newGenres}
            setNewGenres={setNewGenres}
            label="Add genres:"
            width="100%"
          />
          {errors?.genres && <p>Choose some genres.</p>}
          <input type="submit" value="Save book" onClick={submit} />
        </form>
        {isCreateMode && (
          <img src={selectedImage} alt="#" className={styles.cover} />
        )}
      </div>
    </div>
  );
};

export default BookForm;
