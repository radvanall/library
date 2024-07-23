import React from "react";
import { NavLink } from "react-router-dom";
const NavLinks = ({ links, styles }) => {
  return (
    <div>
      {links.map((link) => (
        <NavLink
          to={link.address}
          className={({ isActive }) => {
            return isActive ? styles.active : "";
          }}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
