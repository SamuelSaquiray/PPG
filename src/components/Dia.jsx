import PropTypes from "prop-types";
import "./Dia.css";

const statusColors = {
    normal: "green",
    precaución: "yellow",
    alerta: "red",
    disable: "disable",
};

function DayCard({ name, status }) {
    const isClickable = status != "disable";

    return (
        <div className="day-card" style={{ cursor: isClickable ? "pointer" : "default", backgroundColor: !isClickable ? "#f0f0f0" : "white", opacity: !isClickable ? 0.5 : 1 }}>
            {/* Indicador de estado */}
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
