import React from "react";
import { useContext } from "react";
import { MainContext, MainProvider } from "../../context/MainContext";
import { NavLink } from "react-router-dom";
import BooksContainer from "../../components/BooksContainer/BooksContainer";
import MainFooter from "../../components/MainFooter/MainFooter";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import MainMenu from "../../components/MainMenu/MainMenu";
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
        {/* <GenreFilter data={data} error={error} isLoading={isLoading} /> */}
        <MainMenu />
        <GenreFilter />
        <BooksContainer />
        <MainFooter />
      </div>
    </MainProvider>
  );
};

export default Main;
