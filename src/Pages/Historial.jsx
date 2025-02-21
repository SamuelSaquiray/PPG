import Header from "../components/Header";
import "./Historial.css";
import DayCard from "../components/Dia";

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
  return (
    <>
    <Header/>
    <div className="historial-container">
      <h2 className="title-historial">Control Semanal</h2>
      <p className="description-historial">Cada color indica el estado de salud en ese día.</p>
      <div className="days-container">
        {days.map((day) => (
          <DayCard key={day.name} name={day.name} status={day.status} />
        ))}
      </div>
    </div>
    </>
  );
};

export default WeeklyHealthControl;
