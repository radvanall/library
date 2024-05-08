import { useContext, createContext, useState, useEffect } from "react";
import useGet from "../api/useGet";
// const params = {
//   page: 1,
//   limit: 10,
//   ignoredGenres: JSON.stringify([1, 7, 13]),
// };
const MainContext = createContext({});

const MainProvider = ({ children }) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ignoredGenres: JSON.stringify([]),
  });
  const { data: genres, error, isLoading } = useGet("genres/book-count");
  const {
    data: books,
    error: booksError,
    isLoading: booksAreLoading,
  } = useGet("books", params, [params]);

  return (
    <MainContext.Provider
      value={{
        genres,
        error,
        isLoading,
        books,
        booksError,
        booksAreLoading,
        params,
        setParams,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
