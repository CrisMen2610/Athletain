import React from "react";
import Banner from "sections/Banner/Banner";
import Services from "sections/ServicesSection/Services";
import { HOME_CONTENTS, PAGES } from "services/demo-content/constants";
import { SERVICES } from "./mocks/home-mocks";
import CtaSection from "sections/CTASection/CTASection";
import HeroSection from "sections/hero/HeroSection";
import AutoTestimonials from "sections/TestimonialSlider/AutoTestimonials";
import SmallBanner from "sections/smallBanner/SmallBanner";

const homeContent = HOME_CONTENTS.Home;

const homeServices = homeContent.services || SERVICES;

const homeCta = homeContent.cta;

const typePage = PAGES.HOME;

const Home: React.FC = () => (
  <div>
    <Banner
      title={homeContent.banner.title}
      subtitle={homeContent.banner.subtitle}
      description={homeContent.banner.description}
      buttonText={homeContent.banner.buttonText}
      type={typePage}
    />
    <Services services={homeServices} type={typePage} />
    <CtaSection ctaSection={homeCta} />
    <HeroSection
      heroSection={
        homeContent.hero
          ? homeContent.hero
          : { title: "Default Title", text: "Default Text" }
      }
    />
    <AutoTestimonials />
    <SmallBanner />
  </div>
);

export default Home;
