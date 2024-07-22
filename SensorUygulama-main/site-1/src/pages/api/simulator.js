// src/pages/api/sensor.js
import { v4 as uuidv4 } from "uuid";
import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "civa.gen.tr",
  user: "sensor",
  password: "iCZV86UA!cmHKAiT",
  database: "sensor",
  connectionLimit: 5,
});

const generateRandomTemperature = () => Math.floor(Math.random() * 51) - 10; // -10 to 40
const generateRandomHumidity = () => Math.floor(Math.random() * 101); // 0 to 100

export default async function handler(req, res) {
  const temperature = generateRandomTemperature();
  const humidity = generateRandomHumidity();

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO sensor_data (id, temperature, humidity, timestamp) VALUES (?, ?, ?, NOW())",
      [uuidv4(), temperature, humidity]
    );
    conn.release();
    res.status(200).json({ success: true, temperature, humidity });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
}
