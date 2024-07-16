import React, { useState } from "react";
import styles from "./BookData.module.scss";
import stat from "../../images/static/book.png";
import { ReactComponent as Feather } from "../../images/svg/feather.svg";
import { useNavigate, createSearchParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import usePut from "../../api/usePut";
import ChangeCover from "../ChangeCover/ChangeCover";
const BookData = ({ book, refetch }) => {
  const [isActive, setIsActive] = useState(false);
  const [newCoverMessage, setNewCoverMessage] = useState(false);
  const { putData, setMessage, setError, message, error } = usePut(
    `/books/change-cover/${book?.id}`
  );
  const cover = book.cover
    ? "images/books/" + book.cover.split("/").pop()
    : book.cover;
  console.log("cover=", cover);
  console.log("book=", book);
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
  const submitCoverChange = async (newCover) => {
    const formData = new FormData();
    if (newCover) {
      formData.append("cover", newCover);
      await putData(formData);
      await refetch();
    } else {
      setNewCoverMessage("You should choose a new cover.");
      setTimeout(() => {
        setNewCoverMessage(false);
      }, [3000]);
    }
  };
  return (
    <div className={styles.book__data}>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <ChangeCover
          path={cover ?? stat}
          submit={submitCoverChange}
          isActive={isActive}
        />
        {newCoverMessage && <p>{newCoverMessage}</p>}
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </Modal>
      <Feather
        className={styles.edit__icon}
        onClick={() => setIsActive(true)}
      />
      {book?.cover ? (
        // <img className={styles.cover} src={book.cover} alt="#" />
        <img
          className={styles.cover}
          // src="images/books/2024-07-15T18-49-00.122Z-hqdefault.jpg"
          src={cover}
          alt="#"
        />
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
