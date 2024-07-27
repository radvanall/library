import React from "react";
import BookForm from "../../components/BookForm/BookForm";
import styles from "./NewBook.module.scss";
import usePost from "../../api/usePost";
const NewBook = () => {
  const { postData, setMessage, setError, message, error } = usePost("books");
  return (
    <div className={styles.new__book}>
      <BookForm submitData={postData} isCreateMode={true} />
      {message && message}
      {error && error}
    </div>
  );
};

export default NewBook;
