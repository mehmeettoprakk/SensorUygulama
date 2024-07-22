// scripts/sensor-simulator.js
const fetch = require("node-fetch");

const SIMULATION_INTERVAL = 7000; // 7 saniye

const sendSensorData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/sensor");
    const data = await response.json();
    console.log("Sensor data:", data);
  } catch (error) {
    console.error("Error sending sensor data:", error);
  }
};

setInterval(sendSensorData, SIMULATION_INTERVAL);
