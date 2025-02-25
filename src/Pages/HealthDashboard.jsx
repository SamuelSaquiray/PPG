import { useState, useEffect } from "react";
import "./HealthDashboard.css";
import Header from "../components/Header";
import Ppchart from "../components/PPGChart";
import { AlertPPG } from "../components/Alert";

const idUser = "-OJx1Np4YHQT2c8ASdCd";
const Api = "https://api-lh8x.onrender.com";

const HealthDashboard = () => {
  const [jsonUserData, setJsonUserData] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [roundedAvgHeartRate, setRoundedAvgHeartRate] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${Api}/heart_rate_data/${idUser}`);
        const responseUserData = await fetch(`${Api}/user/${idUser}`);
        
        const json = await response.json();
        const userData = await responseUserData.json();

        const latestData = Object.values(json).slice(-80);
        const avgHeartRate =
          latestData.reduce((acc, curr) => acc + curr.heart_rate, 0) / latestData.length;

        setJsonUserData(userData);
        setDataArray(latestData);
        setRoundedAvgHeartRate(Math.round(avgHeartRate));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, []);

  if (!jsonUserData || dataArray.length === 0) {
    return <p>Cargando datos...</p>;
  }

  const progress_calories = 35;
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
            onError={(e) => e.target.src = defaultImage} 
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
          <p className="rate">
            <span>{dataArray[dataArray.length - 1]?.heart_rate}</span>  
            <span className="bpm"> bpm</span>
          </p>
          <div className="heart"></div>
          <p>
            Frecuencia cardiaca media del día 
            <span> {roundedAvgHeartRate}</span> 
            <span className="bpm"> bpm</span>
          </p>
          <div className="grafico_diario">
            <Ppchart url={`${Api}/ppg_data_filtered/${idUser}`} />
          </div>
          <div className="graph"></div>
        </section>

        <AlertPPG />

        <footer className="footer-stats">
          <div className="container">
            <div className="progress" style={{ "--i": progress_calories, "--clr": "#ff0000" }}>
              <h3>35<span>%</span></h3>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HealthDashboard;
