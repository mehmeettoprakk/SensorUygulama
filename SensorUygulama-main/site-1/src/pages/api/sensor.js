import { get_sensors } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const sonuc = await get_sensors();
    console.log("Sonuc : ", sonuc);

    if (sonuc && Array.isArray(sonuc) && sonuc.length > 0) {
      res.status(200).json({ sonuc: true, data: sonuc });
    } else {
      res.status(404).json({
        sonuc: false,
        message: "No motors found or data is not in expected format",
      });
    }
  } catch (error) {
    console.error("Error fetching motors:", error);
    res.status(500).json({ sonuc: false, message: "Internal Server Error" });
  }
}
