import React, { useContext } from "react";
import styles from "./BooksContainer.module.scss";
import BooksCard from "../BooksCard/BooksCard";
import { MainContext } from "../../context/MainContext";
const BooksContainer = () => {
  const { books, booksError, booksAreLoading } = useContext(MainContext);

  return (
    <div className={styles.books__container}>
      {booksAreLoading && <p>Is loading</p>}
      {booksError && <p>Error</p>}
      {books?.data &&
        books.data.map((book) => <BooksCard book={book} key={book.id} />)}
    </div>
  );
};

export default BooksContainer;
