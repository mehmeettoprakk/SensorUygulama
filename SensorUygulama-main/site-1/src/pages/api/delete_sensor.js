import { delete_sensors } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await delete_sensors(id);
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error("Failed to delete item:", error);
      res.status(500).json({ error: "Failed to delete item" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
