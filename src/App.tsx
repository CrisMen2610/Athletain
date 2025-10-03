import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./layouts/header/Header";
import Home from "./pages/Home/Home";
import Footer from "./layouts/footer/Footer";
import AboutUs from "@pages/about-us/About-Us";
import TalentGallery from "@pages/talent-gallery/Talent-gallery";

const App: React.FC = () => (
  <HashRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre_nosotros" element={<AboutUs />} />
      <Route path="/expo_de_talento" element={<TalentGallery />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
    <Footer />
  </HashRouter>
);

export default App;
