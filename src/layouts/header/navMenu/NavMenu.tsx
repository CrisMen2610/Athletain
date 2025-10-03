import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavMenu.module.scss";

type NavLinkType = {
  label: string;
  to: string;
};

const navLinks: NavLinkType[] = [
  { label: "Inicio", to: "/" },
  { label: "Sobre Nosotros", to: "/sobre_nosotros" },
  { label: "Servicios", to: "/servicios" },
  { label: "Exposición de Talento", to: "/exposición_de_talento" },
  { label: "Explorar Atletas", to: "/explorar_atletas" },
  { label: "Recursos", to: "/recursos" },
];

const NavMenu: React.FC = () => (
  <nav className={styles.navMenu} aria-label="Main navigation">
    <ul>
      {navLinks.map((link) => (
        <li key={link.label}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              isActive ? `${styles.linkActive} navTypo` : "navTypo"
            }
            end={link.to === "/Athletain"}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavMenu;
