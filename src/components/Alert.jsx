import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig.js"; // Importa la configuración de Firebase

export function AlertPPG() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const anomalyRef = ref(database, `users/${userId}/anomalia`);

    const unsubscribe = onValue(anomalyRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log("Nueva anomalía detectada:", snapshot.val());
        startCountdown();
      }
    });

    return () => unsubscribe();
  }, [userId]);

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
      const responseUserData = await fetch(`https://api-lh8x.onrender.com/user/${userId}`);
      const userData = await responseUserData.json();

      // Enviar alerta a WhatsApp
      await fetch("https://api-lh8x.onrender.com/alerta-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_emergency: userData.contact_emergency,
          mensaje: `⚠️ Alerta de hipertensión detectada. Por favor, revise la condición de ${userData.name}.`,
        }),
      });
      // Enviar correo electrónico
      await fetch("https://api-lh8x.onrender.com/enviar-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.doc_email,
          userId:userData.id,
          subject: "Alerta de emergencia",
          message: `Se ha detectado una anomalía en el usuario ${userData.name}.`,
        }),
        
      });

     } catch (error) {
      console.error("Error al enviar alertas:", error);
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
