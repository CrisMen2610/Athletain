import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/header/Header";
import Home from "./pages/Home/Home";
import Footer from "./layouts/footer/Footer";
import AboutUs from "@pages/about-us/About-Us";

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/Athletain" element={<Home />} />
      <Route path="/sobre_nosotros" element={<AboutUs />} />
      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
