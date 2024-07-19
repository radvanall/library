import React, { useState, useEffect, useContext } from "react";
import GenreBox from "../../components/GenreBox/GenreBox";
import styles from "./GenreFilter.module.scss";
import { MainContext } from "../../context/MainContext";
// import useGet from "../../api/useGet";
// const GenreFilter = ({ data, isLoading, error }) => {
const GenreFilter = () => {
  //   const { data, error, isLoading } = useGet("genres/book-count");

  const { genres, isLoading, error, params, setParams, handleGenreChange } =
    useContext(MainContext);
  console.log("data", genres);
  const ignoredGenres = JSON.parse(params.ignoredGenres).map((genre) =>
    parseInt(genre)
  );
  return (
    <div className={styles.genre__filter__container}>
      {isLoading && <p>Is loading</p>}
      {error && <p>Error</p>}
      {genres &&
        genres
          .filter((item) => item.nrOfBooks !== 0)
          .map((genre) => (
            <GenreBox
              label={genre.genre}
              key={genre.id}
              id={genre.id}
              // defaultChecked={
              //   params?.requiredGenre
              //     ? parseInt(params.requiredGenre) === parseInt(genre.id)
              //       ? true
              //       : false
              //     : true
              // }
              // checked={
              //   params?.requiredGenre
              //     ? parseInt(params.requiredGenre) === parseInt(genre.id)
              //       ? true
              //       : false
              //     : true
              // }
              checked={
                params?.requiredGenre
                  ? parseInt(params.requiredGenre) === parseInt(genre.id)
                    ? true
                    : false
                  : ignoredGenres.indexOf(parseInt(genre.id)) === -1
                  ? true
                  : false
              }
              quantity={genre.nrOfBooks}
              onChange={handleGenreChange}
              name={genre.genre}
            />
          ))}
    </div>
  );
};

export default GenreFilter;
