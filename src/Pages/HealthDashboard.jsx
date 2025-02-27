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
    async function fetchData() {
      if (!userId) {
        const fakeUserData = {
          name: "Usuario Invitado",
          age: 30,
          peso: 70,
          calories: { calories: 2000 },
        };
        const fakeDataArray = Array(80).fill({ heart_rate: 75 });
        setJsonUserData(fakeUserData);
        setDataArray(fakeDataArray);
        setRoundedAvgHeartRate(75);
        setProgressCalories(fakeUserData.calories.calories);
        return;
      }
      
      try {
        const response = await fetch(`${Api}/heart_rate_data/${userId}`);
        const responseUserData = await fetch(`${Api}/user/${userId}`);
        
        const json = await response.json();
        const userData = await responseUserData.json();

        const latestData = Object.values(json).slice(-80);
        const avgHeartRate =
          latestData.reduce((acc, curr) => acc + curr.heart_rate, 0) / latestData.length;
        
        setProgressCalories(userData.calories.calories);
        setJsonUserData(userData);
        setDataArray(latestData);
        setRoundedAvgHeartRate(Math.round(avgHeartRate));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, [userId]);

  if (!jsonUserData || dataArray.length === 0) {
    return <p>Cargando datos...</p>;
  }
  
  const defaultImage = "image.png"; 
  const imagen = "user.jpg";

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <header className="user-info">
          <img 
            src={imagen || defaultImage} 
            className="Perfil" 
            alt="Foto de perfil" 
            onError={(e) => (e.target.src = defaultImage)} 
          />
          <div className="details">
            <h2>{jsonUserData.name}</h2>
            <p>Edad: {jsonUserData.age} años</p>
            <p>Estatura: 178 cm </p>
            <p>Peso: {jsonUserData.peso} kg</p>
          </div>
        </header>

        <section className="heart-rate">
          <h3>Ritmo Cardíaco</h3>
          <div className="rate">
            <span>{dataArray[dataArray.length - 1]?.heart_rate}</span>  
            <span className="bpm"> bpm<div className="heart"></div></span>
          
          
          </div>
          <p>
            Frecuencia cardiaca media del día 
            <span> {roundedAvgHeartRate}</span> 
            <span className="bpm"> bpm</span>
          </p>
          <div className="grafico_diario">
            <Ppchart url={userId ? `${Api}/ppg_data_filtered/${userId}` : ""} />
          </div>
          <div className="graph"></div>
        </section>
        
        <footer className="footer-stats">
          <img src="/fire.svg" alt="calorías" />
          <h3>{`${progress_calories}`}<span>kcal</span></h3>
        </footer>
        <AlertPPG name={jsonUserData} />
      </div>
    </>
  );
};

export default HealthDashboard;
