import { motion, AnimatePresence } from "framer-motion";
import MemberCard from "../components/MemberCard";
import Header from "../components/Header";
import "./Equipo.css";

function Equipo() {
  return (
    <>
      <Header />
      <div className="blue">
        <h1>Nuestro equipo de trabajo</h1>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="members-team"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <MemberCard
            title="Samuel Saquiray"
            imagen="public/Saquiray.png"
            description="Estudiante de quinto ciclo de la carrera de ciencias de la computacion"
            cargo="CTO"
          />
          <MemberCard
            title="Diego Uchasara"
            imagen="public/Uchasara.jpg"
            description="Estudiante de septimo ciclo de la carrera de ingenieria electronica"
            cargo="CIO"
          />
          <MemberCard
            title="Berdugo"
            imagen="public/Berde.jpg"
            description="Estudiante de ... No se pero es berdugo"
            cargo="Hierro 4"
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Equipo;
