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
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  });

  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pkczdslngytekfpwdsfb.supabase.co/");//API
        
        const json = await response.json();
        const newDataPoint = json.value;

        setData((prevData) => {
          const updatedLabels = [...prevData.labels, timestamp];
          const updatedData = [...prevData.datasets[0].data, newDataPoint];

          //últimos 50 puntos para simular datos en tiempo real
          if (updatedLabels.length > 50) {
            updatedLabels.shift();
            updatedData.shift();
          }

          return {
            labels: updatedLabels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: updatedData,
              },
            ],
          };
        });

        setTimestamp((prev) => prev + 1);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    const interval = setInterval(fetchData, 10); // Actualiza cada 10 ms
    return () => clearInterval(interval);
  }, [timestamp]);

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
      },
      y: {
        title: {
          display: false,
          text: "PPG ",
        },
        min: 40,
        max: 120,
      },
    },
  };

  return (
    <>
      <h1 className="ppg-chart-section-title">Gráfico de Pulso Cardiaco en Tiempo Real</h1>
      <Line data={data} options={options} />
    </>
  );
};

export default HeartbeatGraph;
