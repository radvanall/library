import React from "react";
import styles from "./BooksCard.module.scss";
import stat from "../../images/static/book.png";
const BooksCard = ({ book }) => {
  return (
    <div className={styles.card__container}>
      {book?.cover ? (
        <img src={book.cover} alt="#" />
      ) : (
        <img src={stat} alt="#" />
      )}
      <h4 className={styles.book__title}>{book.title}</h4>
      <div className={styles.genres}>
        <h4>Genres:</h4>
        {book?.genres && (
          <ul>
            {book.genres.map((genre) => (
              <li key={genre.genreId}>{genre.genre}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BooksCard;
