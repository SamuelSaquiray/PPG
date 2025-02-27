import { useState, useEffect } from "react";
import "./HealthDashboard.css";
import Header from "../components/Header";
import Ppchart from "../components/PPGChart";
import { AlertPPG } from "../components/Alert";
import { useAuth } from "../components/AuthContext";

const Api = "https://api-lh8x.onrender.com";

const HealthDashboard = () => {
  const { userId } = useAuth();
  const [jsonUserData, setJsonUserData] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [roundedAvgHeartRate, setRoundedAvgHeartRate] = useState(0);
  const [progress_calories, setProgressCalories] = useState(0);

  useEffect(() => {
    let intervalId;
    
    async function fetchData() {
      if (!userId) {
        setJsonUserData({
          name: "Usuario Invitado",
          age: 30,
          peso: 70,
          kcal: { calories: 2000 },
        });
        setDataArray(Array(80).fill({ heart_rate: 75 }));
        setRoundedAvgHeartRate(75);
        setProgressCalories(2000);
        return;
      }

      try {
        const response = await fetch(`${Api}/heart_rate_data/${userId}`);
        const responseUserData = await fetch(`${Api}/user/${userId}`);

        if (!response.ok || !responseUserData.ok) throw new Error("Error al obtener datos");

        const json = await response.json();
        const userData = await responseUserData.json();

        const latestData = Object.values(json).slice(-80);
        const avgHeartRate =
          latestData.reduce((acc, curr) => acc + curr.heart_rate, 0) / latestData.length;

        setProgressCalories(userData.calories.kcal);
        setJsonUserData(userData);
        setDataArray(latestData);
        setRoundedAvgHeartRate(Math.round(avgHeartRate));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
    intervalId = setInterval(fetchData, 500); 

    return () => clearInterval(intervalId);
  }, [userId]);

  if (!jsonUserData || dataArray.length === 0) {
    return <p>Cargando datos...</p>;
  }

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <header className="user-info">
          <img
            src="user.jpg"
            className="Perfil"
            alt="Foto de perfil"
            onError={(e) => (e.target.src = "image.png")}
          />
          <div className="details">
            <h2>{jsonUserData.name}</h2>
            <p>Edad: {jsonUserData.age} años</p>
            <p>Estatura: {jsonUserData.altura} cm</p>
            <p>Peso: {jsonUserData.peso} kg</p>
          </div>
        </header>

        <section className="heart-rate">
          <h3>Ritmo Cardíaco</h3>
          <div className="rate">
            <span>{dataArray[dataArray.length - 1]?.heart_rate}</span>
            <span className="bpm">
              bpm<div className="heart"></div>
            </span>
          </div>
          <p>
            Frecuencia cardiaca media del día
            <span> {roundedAvgHeartRate}</span>
            <span className="bpm"> bpm</span>
          </p>
          <div className="grafico_diario">
            <Ppchart url={userId ? `${Api}/ppg_data_filtered/${userId}` : ""} />
          </div>
        </section>

        <footer className="footer-stats">
          <img src="/fire.svg" alt="calorías" />
          <h3>{`${progress_calories}`}<span>kcal</span></h3>
        </footer>
        <AlertPPG data={jsonUserData} />
      </div>
    </>
  );
};

export default HealthDashboard;
