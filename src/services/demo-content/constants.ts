import { SERVICES } from "@pages/Home/mocks/home-mocks";
import { aboutUsContent, homeContent } from "@pages/Home/models/home.model";
import hero from "@assets/imgs/home/2nd-hero.png";
import hero2 from "@assets/imgs/aboutUs/hero2.webp";
import cta_bg from "@assets/imgs/home/cta-bg.webp";
import cta_bg2 from "@assets/imgs/aboutUs/ctaBg2.webp";
import banner2 from "@assets/imgs/aboutUs/banner2.webp";

export const HOME_CONTENTS: homeContent = {
  Home: {
    banner: {
      title: "HAZ QUE EL MUNDO",
      subtitle: "TE VEA JUGAR",
      description:
        "Conéctate con clubes, agentes y organizaciones deportivas. Expón tu talento, accede a asesoría legal y proyecta tu carrera al siguiente nivel.",
      buttonText: "REGÍSTRATE COMO ATLETA",
    },
    services: SERVICES,
    cta: {
      title: "Tu talento, nuestro enfoque",
      text: "Athletain es la plataforma integral para atletas que buscan crecer, destacar y competir a nivel profesional. Conectamos tu perfil con quienes toman decisiones y te brindamos asesoría legal, estrategia digital y herramientas para avanzar con confianza.",
      bgImage: cta_bg,
      center: true,
      type: "home",
    },
    hero: {
      title: "Tu perfil es ",
      strongTitle: "tu mejor carta de presentación",
      text: "Completa tus datos, sube tus videos y empieza a atraer la atención de clubes, agentes y organizaciones que buscan atletas como tú.",
      bgImage: hero,
    },
  },
};

export const ABOUT_US_CONTENTS: aboutUsContent = {
  AboutUs: {
    banner: {
      title: "Conectamos talento con",
      subtitle: "oportunidades reales",
      description:
        "Creamos una plataforma donde los atletas pueden destacar, crecer profesionalmente y tomar el control de su carrera con respaldo, visibilidad y confianza.",
      type: "about-us",
      bgImage: banner2,
      hasButton: false,
    },
    services: [
      {
        title: "NUESTRA MISIÓN",
        iconClass: "icon-sports_football",
        description:
          "Impulsar el desarrollo profesional de los atletas mediante tecnología, asesoría legal y visibilidad estratégica. Buscamos brindar acceso equitativo a herramientas que les permitan crecer, competir y construir una carrera deportiva sólida.",
      },
      {
        title: "NUESTRA VISIÓN",
        iconClass: "icon-media_link",
        description:
          "Ser la plataforma de referencia para atletas que buscan proyección internacional, respaldo jurídico especializado y posicionamiento profesional. Queremos transformar la forma en que los deportistas gestionan su futuro dentro y fuera del campo.",
      },
    ],
    cta: {
      title: "Lo que hacemos diferente",
      subItems: [
        {
          title: "Exposición estratégica",
          text: "tu perfil llega a quienes toman decisiones: clubes, agentes y organizaciones deportivas.",
        },
        {
          title: "Asesoría legal especializada",
          text: "desde contratos hasta disputas internacionales, te acompañamos en cada paso.",
        },
        {
          title: "Servicios integrales",
          text: "integración de imagen, marketing y cumplimiento normativo adaptado al deporte profesional.",
        },
        {
          title: "Confianza y seguridad",
          text: "construimos relaciones duraderas con cada atleta, priorizando su protección y su futuro.",
        },
      ],
      bgImage: cta_bg2,
      type: "about-us",
    },
    hero: {
      title: "¿A quién nos dirigimos?",
      text: "Nuestra plataforma está diseñada para apoyar a los atletas en cada etapa de su carrera, brindando las herramientas y recursos necesarios para alcanzar sus objetivos.",
      bgImage: hero2,
      multipleTexts: [
        {
          text: "que buscan ser vistos, representados y protegidos legalmente.",
          strongText: "Atletas",
        },
        {
          text: "que desean acceder a perfiles verificados y contar con respaldo en su gestión deportiva.",
          strongText: "Clubes, academias y organizaciones",
        },
        {
          text: "que buscan alianzas sólidas para sus representados.",
          strongText: "Agentes y managers",
        },
      ],
      type: "about-us",
    },
  },
};

export enum PAGES {
  HOME = "home",
  ABOUT_US = "about-us",
}
