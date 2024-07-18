import React from "react";
import styles from "./MainMenu.module.scss";
import { NavLink } from "react-router-dom";
const MainMenu = () => {
  return (
    <div>
      <NavLink to="new-book">Add new book</NavLink>
    </div>
  );
};

export default MainMenu;
