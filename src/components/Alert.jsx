import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { ref, onValue, remove, set, get } from "firebase/database";
import { database } from "../firebaseConfig.js";

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

      // Obtener el día actual en español
      const today = new Date().toLocaleDateString("es-ES", { weekday: "long" });

      // Actualizar historial en Firebase
      updateHistory(today);

      await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_emergency: userData.contact_emergency,
          mensaje: `⚠️ Alerta de hipertensión detectada. Por favor, revise la condición de ${userData.name}.`,
        }),
      });

      await fetch("http://localhost:3000/enviar-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.doc_email,
          userId: userData.id,
          subject: "Alerta de emergencia",
          message: `Se ha detectado una anomalía en el usuario ${userData.name}.`,
        }),
      });

      removeAnomaly();
    } catch (error) {
      console.error("Error al enviar alertas:", error);
    }
  };

  const updateHistory = async (day) => {
    try {
      const historyRef = ref(database, `users/${userId}/history`);
      const snapshot = await get(historyRef);
      let history = snapshot.val();

      if (!history) {
        history = {
          Lunes: "normal",
          Martes: "normal",
          Miércoles: "normal",
          Jueves: "disable",
          Viernes: "disable",
          Sábado: "disable",
          Domingo: "disable",
        };
      }

      history[day] = "precaución"; // Marcar el día con anomalía
      await set(historyRef, history);

      console.log(`Historial actualizado: ${day} -> precaución`);
    } catch (error) {
      console.error("Error al actualizar el historial:", error);
    }
  };

  const removeAnomaly = async () => {
    try {
      const anomalyRef = ref(database, `users/${userId}/anomalia`);
      await remove(anomalyRef);
      console.log("Anomalía eliminada de Firebase");
    } catch (error) {
      console.error("Error al eliminar la anomalía:", error);
    }
  };

  const handleFalseAlarm = () => {
    setAlertVisible(false);
    setIsCounting(false);
    setCountdown(5);
    removeAnomaly();
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
            <button onClick={handleFalseAlarm} className="false-alarm-button">
              Falsa alarma
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
