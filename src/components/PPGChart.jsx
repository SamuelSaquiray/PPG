import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const HeartbeatGraph = ({ url }) => {
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
        const response = await fetch(url); // API
        const json = await response.json();

        const dataArray = Object.values(json).slice(-80); // Últimas 80 mediciones

        if (!dataArray.length) {
          console.error("No se pudieron obtener datos.");
          return;
        }

        const labels = dataArray.map((entry) => entry.timestamp);
        const values = dataArray.map((entry) => entry.ppg_filtered);

        setData((prevData) => ({
          labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: values,
            },
          ],
        }));
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
      }
    };

    // Llamar a fetchData cada 500ms
    const interval = setInterval(fetchData, 500);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [url]); // Se actualiza si cambia la URL

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
      },
      y: {
        ticks: { display: false },
        min: -1,
        max: 1,
        grid: { display: false },
      },
    },
  };

  return <Line data={data} options={options} />;
};

HeartbeatGraph.propTypes = {
  url: PropTypes.string.isRequired,
};

export default HeartbeatGraph;
