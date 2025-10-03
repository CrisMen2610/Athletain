import React from "react";
import styles from "./Footer.module.scss";
import { ReactComponent as AltLogo } from "@assets/alt-logo.svg";

export default function Footer() {
  return (
    <footer className={styles.footer} aria-labelledby="site-footer-heading">
      <div className={styles.grid}>
        <section className={styles.brand}>
          <a className={styles.logo} href="/" aria-label="Ir al inicio">
            <AltLogo />
          </a>

          <p className={`${styles.description} body-1-regular`}>
            La plataforma que conecta talento con oportunidades reales. Asesoría
            legal, visibilidad profesional y respaldo estratégico para atletas y
            organizaciones deportivas.
          </p>

          <div className={styles.social}>
            <span className="body-1-regular">Síguenos en:</span>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className={styles.socialIcon}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="11" />
                <path d="M13.5 8H12c-.6 0-1 .4-1 1v1H9v2h2v5h2v-5h1.7l.3-2H13v-1c0-.2.2-.5.5-.5H15V8h-1.5z" />
              </svg>
            </a>
          </div>
        </section>

        <nav
          className={`${styles.column} body-1-regular`}
          aria-labelledby="footer-menu"
        >
          <h3 id="footer-menu" className={styles.title}>
            Menú
          </h3>
          <ul className={styles.links}>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/sobre-nosotros">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/servicios">Servicios</a>
            </li>
            <li>
              <a href="/exposicion-de-talento">Exposición de talento</a>
            </li>
            <li>
              <a href="/explorar-atletas">Explorar Atletas</a>
            </li>
            <li>
              <a href="/recursos">Recursos</a>
            </li>
          </ul>
        </nav>

        <section
          className={`${styles.column} body-1-regular`}
          aria-labelledby="footer-contact"
        >
          <h3 id="footer-contact" className={styles.title}>
            Información de contacto
          </h3>
          <dl className={styles.contactList}>
            <div>
              <dt>Horario:</dt>
              <dd>Todo el día, todos los días.</dd>
            </div>
            <div>
              <dt>Teléfono móvil:</dt>
              <dd>Lorem ipsum dolor sit</dd>
            </div>
            <div>
              <dt>Correo electrónico</dt>
              <dd>Lorem ipsum dolor</dd>
            </div>
          </dl>
        </section>

        <nav
          className={`${styles.column} body-1-regular`}
          aria-labelledby="footer-legal"
        >
          <h3 id="footer-legal" className={styles.title}>
            Legal
          </h3>
          <ul className={styles.links}>
            <li>
              <a href="/aviso-legal">Aviso Legal</a>
            </li>
            <li>
              <a href="/politica-de-privacidad">Política de privacidad</a>
            </li>
            <li>
              <a href="/cookies">Política de cookies (UE)</a>
            </li>
            <li>
              <a href="/accesibilidad">Accesibilidad</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottomBar}>
        <p>
          © {new Date().getFullYear()} Athletin. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
