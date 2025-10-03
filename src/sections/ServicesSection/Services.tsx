import React from "react";
import s from "./Services.module.scss";
import { SERVICES } from "@pages/Home/mocks/home-mocks";

export default function Services({ services = SERVICES, type = "home" }) {
  switch (type) {
    case "about-us":
      return (
        <section className={s.wrapper} aria-labelledby="services-title">
          <div className={s.header}>
            <div className={`${s.titles} ${s.aboutUs_titles}`}>
              <h2 id="services-title" className={`light-title`}>
                Creemos en el poder del talento y en la importancia de
              </h2>
              <h3 className={`${s.title} bold-title`}> mostrarlo al mundo.</h3>
            </div>
            <p className={`${s.subtitle} body-1-regular`}>
              En <strong>Athletain</strong>, somos más que una plataforma. Somos
              un punto de conexión entre el esfuerzo de cada atleta y las
              oportunidades que pueden transformar su carrera. <br />
              <br /> Nacimos con un objetivo claro:{" "}
              <strong>brindar a los deportistas el respaldo</strong>, la
              visibilidad y la asesoría profesional que merecen para destacar en
              un entorno competitivo.
            </p>
          </div>
          <div className={`${s.grid} ${s.aboutUs_contents}`} role="list">
            {services.map((item) => (
              <article key={item.title} className={s.card} role="listitem">
                <span
                  className={`${s.icon} icon ${item.iconClass}`}
                  aria-hidden="true"
                />
                <h4 className={`${s.cardTitle} body-1-regular`}>
                  {item.title}
                </h4>
                <p className="body-1-regular">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      );
    case "home":
      return (
        <section className={s.wrapper} aria-labelledby="services-title">
          <div className={s.header}>
            <div className={s.titles}>
              <h2 id="services-title" className={`light-title`}>
                SOLUCIONES REALES PARA
              </h2>
              <h3 className={`${s.title} bold-title`}>TU CARRERA DEPORTIVA</h3>
            </div>
            <p className={`${s.subtitle} body-1-regular`}>
              Te ofrecemos servicios diseñados exclusivamente para atletas que
              buscan proyectarse con seguridad y estrategia.
            </p>
          </div>

          <div className={s.grid} role="list">
            {SERVICES.map((item) => (
              <article key={item.title} className={s.card} role="listitem">
                <span
                  className={`${s.icon} icon ${item.iconClass}`}
                  aria-hidden="true"
                />
                <h4 className={`${s.cardTitle} body-1-regular`}>
                  {item.title}
                </h4>
              </article>
            ))}
          </div>
        </section>
      );
    case "talent-gallery":
      return (
        <section className={s.wrapper} aria-labelledby="services-title">
          <div className={s.header}>
            <div className={s.titles}>
              <h2 id="services-title" className={`light-title`}>
                ¿Qué es la <strong> Exposición de Talento?</strong>
              </h2>
            </div>
            <p className={`${s.subtitle} body-1-regular`}>
              En <strong>Athletain</strong> creemos que tu carrera merece
              visibilidad. Por eso, creamos esta sección donde puedes subir tu
              perfil deportivo, compartir tus métricas clave y mostrar tu
              rendimiento real en video.
              <br /> <br />
              Tu perfil será revisado por nuestro equipo y podrá ser publicado
              en nuestra galería de atletas destacados.
            </p>
          </div>
        </section>
      );
    default:
      return (
        <div>
          <div>No services available</div>
        </div>
      );
  }
}
