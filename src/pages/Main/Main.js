import React from "react";

import GenreFilter from "../../components/GenreFilter/GenreFilter";
import useGet from "../../api/useGet";
const params = {
  page: 1,
  limit: 10,
  ignoredGenres: [1],
};
const Main = () => {
  const { data, error, isLoading } = useGet("genres/book-count");
  const {
    books,
    error: booksError,
    isLoading: booksAreLoading,
  } = useGet("/books", params);
  return (
    <div style={{ padding: "10px", boxSizing: "border-box" }}>
      Main
      <GenreFilter data={data} error={error} isLoading={isLoading} />
    </div>
  );
};

export default Main;
