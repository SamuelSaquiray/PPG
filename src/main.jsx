import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./Pages/Inicio";
import PPg from "./Pages/Anomalias";
import Equipo from "./Pages/Equipo";
import Historial from "./Pages/Historial";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Historial" element={<Historial />} />
      <Route path="/ppg" element={<PPg />} />
      <Route path="/Equipo" element={<Equipo />} />
    </Routes>
  
  </BrowserRouter>
);
