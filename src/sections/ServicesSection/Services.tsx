import React from "react";
import s from "./Services.module.scss";
import { SERVICES } from "@pages/Home/mocks/home-mocks";

export default function Services({ services = SERVICES }) {
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
            <h4 className={`${s.cardTitle} body-1-regular`}>{item.title}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}
