import { add_sensor } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const result = await add_sensor(data);
      res.status(200).json({ message: "Sensor added" });
    } catch (error) {
      console.error("Error adding sensor:", error);
      res
        .status(500)
        .json({ message: "Error adding sensor", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
