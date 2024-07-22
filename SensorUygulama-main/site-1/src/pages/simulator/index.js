// src/pages/dashboard.js
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [data, setData] = useState({
    temperatures: [],
    humidities: [],
    timestamps: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/simulator");
      const result = await response.json();
      setData((prevData) => ({
        temperatures: [...prevData.temperatures, result.temperature],
        humidities: [...prevData.humidities, result.humidity],
        timestamps: [...prevData.timestamps, new Date().toLocaleTimeString()],
      }));
    };

    const interval = setInterval(fetchData, 10000); // 10 saniyede bir veri al
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.temperatures,
        borderColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        yAxisID: "y-temp",
      },
      {
        label: "Humidity (%)",
        data: data.humidities,
        borderColor: "rgba(54, 162, 235, 0.5)",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        yAxisID: "y-humidity",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        title: {
          display: true,
          text: "Temperature (°C) / Humidity (%)",
        },
        ticks: {
          callback: function (value, index, values) {
            if (this.getLabelForValue(value) % 1 === 0) {
              return this.getLabelForValue(value);
            }
          },
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 20px",
      }}>
      <h1 style={{ margin: "20px 0", textAlign: "center" }}>
        Sensor Simulator
      </h1>
      <div style={{ width: "100%", height: "calc(100% - 60px)" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
