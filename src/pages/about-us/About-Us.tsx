import React from "react";
import Banner from "sections/Banner/Banner";
import Services from "sections/ServicesSection/Services";
import { ABOUT_US_CONTENTS, PAGES } from "services/demo-content/constants";

import CtaSection from "sections/CTASection/CTASection";
import HeroSection from "sections/hero/HeroSection";
import SmallBanner from "sections/smallBanner/SmallBanner";
import { SERVICES } from "@pages/Home/mocks/home-mocks";

const aboutUsContent = ABOUT_US_CONTENTS.AboutUs;

const aboutUsCta = aboutUsContent.cta;

const services = aboutUsContent.services || SERVICES;

const typePage = PAGES.ABOUT_US;

const AboutUs: React.FC = () => (
  <div>
    <Banner
      title={aboutUsContent.banner.title}
      subtitle={aboutUsContent.banner.subtitle}
      description={aboutUsContent.banner.description}
      buttonText={aboutUsContent.banner.buttonText}
      bgImage={aboutUsContent.banner.bgImage}
      type={typePage}
    />
    <Services services={services} type={typePage} />
    <CtaSection ctaSection={aboutUsCta} />
    {aboutUsContent.hero && <HeroSection heroSection={aboutUsContent.hero} />}
    <div
      style={{
        padding: "6.25rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <h2 className="title-2-light">
        ¿Por qué <strong>Athletain?</strong>
      </h2>
      <p
        className="body-1-regular"
        style={{ maxWidth: "45rem", textAlign: "center" }}
      >
        Porque creemos que el talento necesita más que entrenamiento: necesita
        una estructura, una red, una estrategia.
        <br />
        <br />
        <strong>Y eso es exactamente lo que somos.</strong>
      </p>
    </div>
    <SmallBanner />
  </div>
);

export default AboutUs;
