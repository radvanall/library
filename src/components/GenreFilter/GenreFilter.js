import React, { useState, useEffect } from "react";
import GenreBox from "../../components/GenreBox/GenreBox";
import styles from "./GenreFilter.module.scss";
// import useGet from "../../api/useGet";
const GenreFilter = ({ data, isLoading, error }) => {
  //   const { data, error, isLoading } = useGet("genres/book-count");
  const handleGenreChange = (e) => {
    console.log(e.target.checked);
    // e.target.checked = !e.target.checked;
    console.log(e.target.name);
    console.log(e.target.id);
    console.log(e.target);
  };
  return (
    <div className={styles.genre__filter__container}>
      {isLoading && <p>Is loading</p>}
      {error && <p>Error</p>}
      {data &&
        data
          .filter((item) => item.nrOfBooks !== 0)
          .map((genre) => (
            <GenreBox
              label={genre.genre}
              key={genre.id}
              id={genre.id}
              defaultChecked="true"
              quantity={genre.nrOfBooks}
              onChange={handleGenreChange}
              name={genre.genre}
            />
          ))}
    </div>
  );
};

export default GenreFilter;
