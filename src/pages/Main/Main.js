import React from "react";
import { useContext } from "react";
import { MainContext, MainProvider } from "../../context/MainContext";
import BooksContainer from "../../components/BooksContainer/BooksContainer";
import MainFooter from "../../components/MainFooter/MainFooter";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import useGet from "../../api/useGet";
const params = {
  page: 1,
  limit: 10,
  ignoredGenres: JSON.stringify([1, 7, 13]),
};

const Main = () => {
  return (
    <MainProvider>
      <div style={{ padding: "10px", boxSizing: "border-box" }}>
        Main
        {/* <GenreFilter data={data} error={error} isLoading={isLoading} /> */}
        <GenreFilter />
        <BooksContainer />
        <MainFooter />
      </div>
    </MainProvider>
  );
};

export default Main;
