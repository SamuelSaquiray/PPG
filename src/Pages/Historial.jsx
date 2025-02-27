import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import DayCard from "../components/Dia";
import PPGChart from "../components/PPGChart";
import "./Historial.css";

const days = [
  { name: "Lunes", status: "normal" },
  { name: "Martes", status: "normal" },
  { name: "Miércoles", status: "normal" },
  { name: "Jueves", status: "disable" },
  { name: "Viernes", status: "disable" },
  { name: "Sábado", status: "disable" },
  { name: "Domingo", status: "disable" },
];

const WeeklyHealthControl = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (day) => {
    if (day.status != "disable") {
      setSelectedDay(day);
    } else {
      setSelectedDay(null);
    }
  };

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          className="historial-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="title-container">
            <h2 className="title-historial">Control Semanal</h2>
            <p className="description-historial">
              Cada color indica el estado de salud en ese día.
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className="days-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {days.map((day) => (
                <div key={day.name} onClick={() => handleDayClick(day)}
                className={`${selectedDay?.name === day.name ? "selected" : "noselected"}`}>
                  <DayCard name={day.name} status={day.status} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {selectedDay && (
              <motion.div
                key={selectedDay.name}
                className="chart-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h3>Datos de PPG para {selectedDay.name}</h3>
                {selectedDay.status === "normal" ? (
                  <img 
                    src="check.jpg" 
                    alt="Estado normal" 
                    className="status-image" 
                  />
                ) : (
                  <PPGChart day={selectedDay.name} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default WeeklyHealthControl;
