import { Card, PanelContent } from "@/components";
import React, { useEffect, useState } from "react";
import MotorCard from "@/components/themes/motor-card";
import MotorAddPopup from "@/components/themes/motor-add-popup";
interface Motor {
  ad: string;
  tip: number;
  aciklama: string;
  acik_kapali: boolean;
  ayar_degeri: number;
  tarih: string;
}

const Motorlar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [motors, setMotors] = useState<Motor[]>([]);
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/motors", {
          method: "GET",
        });
        const result = await response.json();

        if (response.ok) {
          setMotors(result.data);
        } else {
          console.error("Failed to fetch motors:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <PanelContent title="Motor">
      <Card title="Motorlar">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title">Motor Ekle/Sil</h5>
          <button className="btn btn-success" onClick={handleOpenPopup}>
            Motor Ekle
          </button>
        </div>
        <div className="row">
          <MotorCard items={motors} />
        </div>
        {isPopupVisible && (
          <MotorAddPopup
            isVisible={isPopupVisible}
            onClose={handleClosePopup}
          />
        )}
      </Card>
    </PanelContent>
  );
};

export default Motorlar;
