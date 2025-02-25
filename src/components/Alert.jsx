import { useState, useEffect } from "react";

// Componente de Alerta en la página de control del PPG
export function AlertPPG() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      console.log("Mensaje enviado a contactos de emergencia");
    }
  }, [countdown, isCounting]);

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