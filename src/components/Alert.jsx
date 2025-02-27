import PropTypes from "prop-types";
import { useState, useEffect } from "react";


export function AlertPPG(data) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      sendEmergencyAlert();
    }
  }, [countdown, isCounting]);
  const sendEmergencyAlert = async () => {
    try {
      const response = await fetch("http://localhost:3000/alerta-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numeros_emergencia: [51946248041,51957954716], // Número de emergencia
          mensaje: `⚠️ Alerta de hipertensión detectada. Por favor, revise la condición de ${data.name.name}.`,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error al enviar alerta:", error);
    }
  };

  const handleFalseAlarm = () => {
    setAlertVisible(false);
    setIsCounting(false);
    setCountdown(5);
    console.log("Falsa alarma descartada");
  };

  const startCountdown = () => {
    setAlertVisible(true);
    setIsCounting(true);
  };

  return (
    <div>
      <button onClick={startCountdown}>Simular Alerta</button>
      {alertVisible && (
        <div className="alert-box">
          <p className="alert-text">¡Alerta de posible arritmia!</p>
          <p>Enviando alerta a contactos de emergencia en {countdown} segundos...</p>
          <div className="alert-buttons">
            <button onClick={handleFalseAlarm} className="false-alarm-button">Falsa alarma</button>
          </div>
        </div>
      )}
    </div>
  );
}
PropTypes.AlertPPG = {
  data: PropTypes.string.isRequired,
};