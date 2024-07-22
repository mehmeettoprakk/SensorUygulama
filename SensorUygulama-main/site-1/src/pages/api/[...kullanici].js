import { adam_var_mi } from "../../lib/db";

export default async function handler(req, res) {
  const fullUrl = `${req.headers.host}${req.url}`;
  const { searchParams } = new URL(`http://${fullUrl}`);

  const sonuc = await adam_var_mi(
    searchParams.get("eposta"),
    searchParams.get("sifre")
  );
  console.log("Sonuc : " + sonuc);

  if (sonuc) {
    res.status(200).json({ sonuc: true });
  } else {
    res.status(404).json({ sonuc: false });
  }
}
