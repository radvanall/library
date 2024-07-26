import React, { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import styles from "./MainMenu.module.scss";
import { NavLink } from "react-router-dom";
import CustomSearch from "../CustomSearch/CustomSearch";
const MainMenu = () => {
  const { changeSearchWord, resetParams } = useContext(MainContext);

  return (
    <div>
      <NavLink to="new-book">Add new book</NavLink>
      <CustomSearch name="search" id="serarch_1" submit={changeSearchWord} />
      <button onClick={resetParams}>Reset</button>
    </div>
  );
};

export default MainMenu;
