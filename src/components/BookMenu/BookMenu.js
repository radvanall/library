import React, { useState, useEffect } from "react";
import styles from "./BookMenu.module.scss";
import BookForm from "../BookForm/BookForm";
import Modal from "../Modal/Modal";
import usePut from "../../api/usePut";
import { ReactComponent as Feather } from "../../images/svg/feather.svg";
const BookMenu = ({ data, refetch }) => {
  const [isActive, setIsActive] = useState(false);
  const [initialGenres, setInitialGenres] = useState();
  const [initialData, setInitialData] = useState();
  const { putData, setMessage, setError, message, error } = usePut(
    `/books/change-genres/${data.id}`
  );
  const {
    putData: putFields,
    setMessage: setFieldsMessage,
    setError: setFieldsError,
    message: fieldsMessage,
    error: fieldsError,
  } = usePut(`/books/${data.id}`);
  console.log("book menuL:", data);
  useEffect(() => {
    const initialData1 = {
      title: data.title,
      author: data.author,
      desc: data.description,
    };
    const initialGenres1 = data.genres
      ? data?.genres.map((item) => ({ value: item.genre, id: item.genreId }))
      : [];
    setInitialData(initialData1);
    setInitialGenres(initialGenres1);
  }, [isActive]);
  const submit = async (data) => {
    let genres = JSON.parse(data.get("genres"));
    data.delete("genres");
    const object = {};
    data.forEach((value, key) => (object[key] = value));
    const json = JSON.stringify(object);
    await putData({ genres });
    await putFields(object);
    await refetch();
    console.log("genres:", { genres: genres });
    console.log("json=", json);
    console.log("o=", object);
  };
  return (
    <div className={styles.book__menu}>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <>
          <BookForm
            initialData={initialData}
            initialGenres={initialGenres}
            submitData={submit}
          />
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
          {fieldsError && <p>{fieldsError}</p>}
          {fieldsMessage && <p>{fieldsMessage}</p>}
        </>
      </Modal>
      <Feather
        className={styles.edit__svg}
        onClick={() => setIsActive((prev) => !prev)}
      />
    </div>
  );
};

export default BookMenu;
