import { Card, PanelContent } from "@/components";
import SensorCard from "@/components/themes/sensor-card";
import React, { useState, useEffect, useRef } from "react";
import SensorAddPopup from "@/components/themes/sensonr-add-popup";

interface Sensor {
  ad: string;
  tip: number;
  aciklama: string;
  tarih: string;
}
const Sensorler = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/sensor");
        const result = await response.json();

        if (response.ok) {
          setSensors(result.data);
        } else {
          console.error("Failed to fetch sensors:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <PanelContent title="Sensör">
      <Card title="Sensörler">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title">Sensör Ekle/Sil</h5>
          <button className="btn btn-success" onClick={handleOpenPopup}>
            Sensor Ekle
          </button>
        </div>
        <div className="row">
          <SensorCard items={sensors} />
        </div>
        {isPopupVisible && (
          <SensorAddPopup
            isVisible={isPopupVisible}
            onClose={handleClosePopup}
          />
        )}
      </Card>
    </PanelContent>
  );
};

export default Sensorler;
