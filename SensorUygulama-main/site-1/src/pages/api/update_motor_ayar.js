import { update_motor_ayar_degeri } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id, value } = req.body;
      const result = await update_motor_ayar_degeri(value, id);
      res.status(200).json({ message: "Deger changed" });
    } catch (error) {
      console.error("Error changing motor:", error);
      res
        .status(500)
        .json({ message: "Error changing motor", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
