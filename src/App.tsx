import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/header/Header";
import Home from "./pages/Home/Home";

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/Athletain" element={<Home />} />
      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;
