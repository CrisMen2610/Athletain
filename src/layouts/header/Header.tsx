import React from "react";
import { ReactComponent as Logo } from "@assets/athletain_logo.svg";
import styles from "./Header.module.scss";
import NavMenu from "./navMenu/NavMenu";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Logo aria-label="Logo of Athletain" />
    </div>
    <NavMenu />
    <NavLink
      to="/contactanos"
      className={({ isActive }) =>
        isActive ? `${styles.linkActive} navTypo` : `${styles.link} navTypo`
      }
      end={true}
    >
      Contactanos
    </NavLink>
  </header>
);

export default Header;
