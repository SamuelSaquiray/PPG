import PropTypes from "prop-types";
import "./Dia.css"; 

const statusColors = {
    normal: "green",
    precaución: "yellow",
    alerta: "red",
    disable: "disable",
};

function DayCard({ name, status }) {
    return (
        <div className={`day-card`}>
            {/* Indicador de estado */}
            
            {/* Nombre del día */}
            <p className="day-name">{name}</p>
            <span className={`status-indicator ${statusColors[status]}`}></span>
        </div>
    );
}

DayCard.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default DayCard;
