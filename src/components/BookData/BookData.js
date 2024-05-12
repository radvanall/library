import React from "react";
import styles from "./BookData.module.scss";
import stat from "../../images/static/book.png";
import { useNavigate, createSearchParams } from "react-router-dom";

const BookData = ({ book }) => {
  const navigate = useNavigate();
  const goToGenre = (e) => {
    console.log(e.target.value);
    navigate({
      pathname: "/",
      search: createSearchParams({
        genreId: e.target.value,
      }).toString(),
    });
  };
  return (
    <div className={styles.book__data}>
      {book?.cover ? (
        <img className={styles.cover} src={book.cover} alt="#" />
      ) : (
        <img className={styles.cover} src={stat} alt="#" />
      )}
      <div className={styles.book__description}>
        <h3>{book.title}</h3>
        <br />
        <p>{book.author}</p>
        <br />
        <p className={styles.desc}>{book.description}</p>
        <div>
          <span>Genres:</span>
          <div className={styles.genres}>
            {book?.genres &&
              book.genres.map((genre) => (
                <button
                  key={genre.genreId}
                  value={genre.genreId}
                  onClick={(e) => goToGenre(e)}
                >
                  {genre.genre}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookData;
