import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { ReactComponent as Icon } from "../../images/svg/book.svg";
const Navbar = () => {
  console.log(styles);
  return (
    <nav className={styles.nav}>
      <div>
        <NavLink to="/">
          <Icon className={styles.book_svg} data-testid="logo" />
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/login"
          className={(isActive) => (isActive ? styles.active : "")}
        >
          Login
        </NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
