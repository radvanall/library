import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGet from "../api/useGet";
// const params = {
//   page: 1,
//   limit: 10,
//   ignoredGenres: JSON.stringify([1, 7, 13]),
// };
const MainContext = createContext({});

const MainProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  let requiredGenre = null;
  if (searchParams.has("genreId")) {
    requiredGenre = searchParams.get("genreId");
    searchParams.delete("genreId");
  }

  console.log("requiredGenre=", requiredGenre);
  const [params, setParams] = useState({
    page: 1,
    limit: 3,
    requiredGenre,
    searchWord: "",
    ignoredGenres: JSON.stringify([]),
  });
  const { data: genres, error, isLoading } = useGet("genres/book-count");
  const {
    data: books,
    error: booksError,
    isLoading: booksAreLoading,
  } = useGet("books", params, [params]);

  const handleGenreChange = (e) => {
    console.log(e.target.checked);
    // e.target.checked = !e.target.checked;
    console.log(e.target.name);
    console.log(e.target.id);
    console.log(e.target);
    let newIgnoredGenres = JSON.parse(params.ignoredGenres);
    console.log(newIgnoredGenres);

    if (e.target.checked) {
      if (params?.requiredGenre) {
        newIgnoredGenres = genres
          .filter(
            (genre) => parseInt(genre.id) !== parseInt(params.requiredGenre)
          )
          .map((genre) => parseInt(genre.id));
      }
      const index = newIgnoredGenres.indexOf(parseInt(e.target.id));
      console.log("index=", index);
      if (index >= 0) {
        newIgnoredGenres.splice(index, 1);
      }
      console.log("newIgnoredGenres slice=", newIgnoredGenres);
    } else {
      if (params?.requiredGenre) {
        newIgnoredGenres = genres.map((genre) => parseInt(genre.id));
      } else newIgnoredGenres.push(parseInt(e.target.id));
    }
    console.log(newIgnoredGenres);
    setParams({
      ...params,
      requiredGenre: null,
      page: 1,
      ignoredGenres: JSON.stringify(newIgnoredGenres),
    });
  };
  const changeSearchWord = (word) => {
    setParams((prev) => {
      const newParams = {
        ...prev,
        page: 1,
        searchWord: word,
      };
      return newParams;
    });
  };
  const resetParams = () => {
    setParams((prev) => {
      const newParams = {
        ...prev,
        requiredGenre: null,
        page: 1,
        searchWord: "",
        ignoredGenres: JSON.stringify([]),
      };
      return newParams;
    });
  };
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
        resetParams,
        setParams,
        handleGenreChange,
        changeSearchWord,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
