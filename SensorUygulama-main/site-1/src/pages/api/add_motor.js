import { add_motor } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const result = await add_motor(data);
      res.status(200).json({ message: "Motor added" });
    } catch (error) {
      console.error("Error adding motor:", error);
      res
        .status(500)
        .json({ message: "Error adding motor", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
