import { SERVICES } from "@pages/Home/mocks/home-mocks";
import { homeContent } from "@pages/Home/models/home.model";
import hero from "@assets/imgs/home/2nd-hero.png";
import cta_bg from "@assets/imgs/home/cta-bg.webp";

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
    },
    hero: {
      title: "Tu perfil es ",
      strongTitle: "tu mejor carta de presentación",
      text: "Completa tus datos, sube tus videos y empieza a atraer la atención de clubes, agentes y organizaciones que buscan atletas como tú.",
      bgImage: hero,
    },
    // testimonials: [
    //   {
    //     name: "Lucas Martínez",
    //     role: "Tenista profesional – Argentina",
    //     photo: photoLucas,
    //     rating: 5,
    //     quote:
    //       "Gracias a Athletein pude mostrar mi perfil a entrenadores en Europa. Subí mis métricas y videos, y en menos de un mes ya estaba viajando para competir en una liga internacional. La asesoría legal me dio total tranquilidad para firmar mi primer contrato afuera.",
    //     ctaHref: "/perfil/lucas-martinez",
    //     ctaLabel: "Ver más",
    //   },
    //   {
    //     name: "Lucas Martínez",
    //     role: "Tenista profesional – Argentina",
    //     photo: photoLucas,
    //     rating: 5,
    //     quote:
    //       "Gracias a Athletein pude mostrar mi perfil a entrenadores en Europa. Subí mis métricas y videos, y en menos de un mes ya estaba viajando para competir en una liga internacional. La asesoría legal me dio total tranquilidad para firmar mi primer contrato afuera.",
    //     ctaHref: "/perfil/lucas-martinez",
    //     ctaLabel: "Ver más",
    //   },
    // ],
  },
};

export enum PAGES {
  HOME = "home",
}
