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
  // const handleGenreChange = (e) => {
  //   console.log(e.target.checked);
  //   // e.target.checked = !e.target.checked;
  //   console.log(e.target.name);
  //   console.log(e.target.id);
  //   console.log(e.target);
  //   let newIgnoredGenres = JSON.parse(params.ignoredGenres);
  //   console.log(newIgnoredGenres);

  //   if (e.target.checked) {
  //     const index = newIgnoredGenres.indexOf(parseInt(e.target.id));
  //     console.log("index=", index);
  //     if (index >= 0) {
  //       newIgnoredGenres.splice(index, 1);
  //     }
  //     console.log("newIgnoredGenres slice=", newIgnoredGenres);
  //   } else {
  //     newIgnoredGenres.push(parseInt(e.target.id));
  //   }
  //   console.log(newIgnoredGenres);
  //   setParams({
  //     ...params,
  //     page: 1,
  //     ignoredGenres: JSON.stringify(newIgnoredGenres),
  //   });
  // };

  console.log("data", genres);
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
              defaultChecked={
                params?.requiredGenre
                  ? parseInt(params.requiredGenre) === parseInt(genre.id)
                    ? true
                    : false
                  : true
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
