import { TableCell, TableRow } from "@mui/material";
import React from "react";
function MotorTable({ items }: { items: any }) {
  return items.map((item: any) => (
    <TableRow key={item.ad}>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.ad}</TableCell>
      <TableCell>{item.tip}</TableCell>
      <TableCell>{item.aciklama}</TableCell>
      <TableCell>{item.acik_kapali ? "Açık" : "Kapalı"}</TableCell>
      <TableCell>{item.ayar_degeri}</TableCell>
      <TableCell>{item.tarih}</TableCell>
    </TableRow>
  ));
}

export default MotorTable;
