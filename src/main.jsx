import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./Pages/Inicio";
import Dashboard from "./Pages/HealthDashboard";
import Equipo from "./Pages/Equipo";
import Historial from "./Pages/Historial";
import { Unirse } from "./Pages/Unirse";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Historial" element={<Historial />} />
      <Route path="/ppg" element={<Dashboard />} />
      <Route path="/Equipo" element={<Equipo />} />
      <Route path="/Unirse" element={<Unirse />} />
    </Routes>
  
  </BrowserRouter>
);
