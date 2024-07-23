import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import NavLinks from "../NavLinks/NavLinks";
import { links } from "../../api/links";
import { ReactComponent as Icon } from "../../images/svg/book.svg";
import { useAuthContext } from "../../context/AuthContext";
import Cabinet from "../Cabinet/Cabinet";
const Navbar = () => {
  const { user } = useAuthContext();
  const isLogged = user.id === null ? false : true;
  console.log(styles);
  console.log(user);
  return (
    <nav className={styles.nav}>
      <div>
        <NavLink to="/">
          <Icon className={styles.book_svg} data-testid="logo" />
        </NavLink>
      </div>
      <div className={styles.links__bar}>
        <NavLinks
          links={isLogged ? links[user.role] : links[1111]}
          styles={styles}
        />
        {isLogged && <Cabinet user={user} />}
        {/* <NavLink
          to="/login"
          className={({ isActive }) => {
            return isActive ? styles.active : "";
          }}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => {
            return isActive ? styles.active : "";
          }}
        >
          Register
        </NavLink> */}
      </div>
    </nav>
  );
};

export default Navbar;
