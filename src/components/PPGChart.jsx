import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const HeartbeatGraph = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Pulso Cardiaco",
        data: [],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api-lh8x.onrender.com/ppg_data_filtered"); // API
        const json = await response.json();
        const dataArray = Object.values(json).slice(-80); // Obtiene las últimas 100 mediciones

        if (!dataArray.length) {
          console.error("No se pudieron obtener datos.");
          return;
        }

        const labels = dataArray.map((entry) => entry.timestamp);
        const values = dataArray.map((entry) => entry.ppg_filtered);

        setData({
          labels,
          datasets: [
            {
              ...data.datasets[0],
              data: values,
            },
          ],
        });
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Tiempo (s)",
           
        },
        ticks: {
          display: false,
          },
      },
      y: {
        title: {
          display: false,
          text: "PPG ",
        },
        ticks: {
            display: false,
            },
        min: -1,
        max: 1,
      },
    },
  };

  return (
    <>
      <h1 className="ppg-chart-section-title">Gráfico de Pulso Cardiaco</h1>
      <Line data={data} options={options} />
    </>
  );
};

export default HeartbeatGraph;
