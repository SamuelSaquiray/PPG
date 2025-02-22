import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import DayCard from "../components/Dia";
import PPGChart from "../components/PPGChart"; // Suponiendo que esta es la gráfica de PPG
import "./Historial.css";

const days = [
  { name: "Lunes", status: "normal" },
  { name: "Martes", status: "normal" },
  { name: "Miércoles", status: "normal" },
  { name: "Jueves", status: "alerta" },
  { name: "Viernes", status: "alerta" },
  { name: "Sábado", status: "precaución" },
  { name: "Domingo", status: "disable" },
];

const WeeklyHealthControl = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  
  const handleDayClick = (day) => {
    if (day.status === "alerta" || day.status === "precaución") {
      setSelectedDay(day);
    } else {
      setSelectedDay(null);
    }
  };

  return (
    <>
      <Header />
      <div className="historial-container">
        <h2 className="title-historial">Control Semanal</h2>
        <p className="description-historial">
          Cada color indica el estado de salud en ese día.
        </p>
        <div className="days-container">
          {days.map((day) => (
            <div key={day.name} onClick={() => handleDayClick(day)}>
              <DayCard name={day.name} status={day.status} />
            </div>
          ))}
        </div>
        
        {selectedDay && (
          <motion.div 
            className="chart-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Datos de PPG para {selectedDay.name}</h3>
            <PPGChart day={selectedDay.name} />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default WeeklyHealthControl;
