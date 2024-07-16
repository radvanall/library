import React, { useState, useEffect } from "react";
import styles from "./BookMenu.module.scss";
import BookForm from "../BookForm/BookForm";
import Modal from "../Modal/Modal";
import usePut from "../../api/usePut";
import useDelete from "../../api/useDelete";
import { ReactComponent as Feather } from "../../images/svg/feather.svg";
import { ReactComponent as Del } from "../../images/svg/delete.svg";
import { useNavigate } from "react-router-dom";

const BookMenu = ({ data, refetch }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [initialGenres, setInitialGenres] = useState();
  const [initialData, setInitialData] = useState();
  const { putData, setMessage, setError, message, error } = usePut(
    `/books/change-genres/${data.id}`
  );
  const { deleteData, error: deleteError } = useDelete("/books");
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
  const deleteBook = async () => {
    if (data.id) {
      await deleteData(data.id);
      if (!deleteError) {
        navigate("/delete-page/book");
      }
    }
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
      <Modal isActive={isDeleteActive} setIsActive={setIsDeleteActive}>
        <>
          <p>Are you sure you want to delete this book?</p>
          <button onClick={deleteBook}>Delete</button>
        </>
      </Modal>
      <Feather
        className={styles.edit__svg}
        onClick={() => setIsActive((prev) => !prev)}
      />
      <Del
        className={styles.edit__svg}
        onClick={() => setIsDeleteActive((prev) => !prev)}
      />
    </div>
  );
};

export default BookMenu;
