import React from "react";
import Banner from "sections/Banner/Banner";
import { CONTENTS, PAGES } from "services/demo-content/constants";

const homeContent = CONTENTS.Home;

const typePage = PAGES.HOME;

const Home: React.FC = () => (
  <div>
    <Banner
      title={homeContent.banner.title}
      subtitle={homeContent.banner.subtitle}
      description={homeContent.banner.description}
      buttonText={homeContent.banner.buttonText}
      type={typePage}
    />{" "}
  </div>
);

export default Home;
