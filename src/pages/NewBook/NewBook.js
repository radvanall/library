import React from "react";
import BookForm from "../../components/BookForm/BookForm";
import styles from "./NewBook.module.scss";
const NewBook = () => {
  return (
    <div className={styles.new__book}>
      <BookForm></BookForm>
    </div>
  );
};

export default NewBook;
