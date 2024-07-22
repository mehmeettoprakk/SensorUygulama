import { Card, PanelContent } from "@/components";
import Link from "next/link";
import { useTable } from "react-table";
import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MotorTable from "@/components/themes/motor-table";
import SensorTable from "@/components/themes/sensor-table";

export default function Dashboard() {
  const [motors, setMotors] = useState([]);
  const [sensors, setSensors] = useState([]);
  useEffect(() => {
    async function fetchDataMotor() {
      try {
        const response = await fetch("/api/motors");
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
    async function fetchDataSensor() {
      try {
        const response = await fetch("/api/sensor");
        const result = await response.json();

        if (response.ok) {
          console.log("Data: ", result.data);
          setSensors(result.data);
        } else {
          // setError(result.message);
        }
      } catch (error) {
        // setError("Error fetching data");
      } finally {
        // setLoading(false);
      }
    }

    fetchDataMotor();
    fetchDataSensor();
  }, []);
  return (
    <PanelContent headerContent title="Dashboard">
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{motors.length}</h3>
              <p>Çalışan Motorlar</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
            <Link href="/motorlar" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{sensors.length}</h3>
              <p>Sensörler</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
            <Link href="/sensorler" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>65</h3>
              <p>Çalışan Fan sayısı</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
            <Link href="/motorlar" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        <div className="col-12">
          <Card title="Motorlar">
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell>Ad</TableCell>
                      <TableCell>Tip</TableCell>
                      <TableCell>Aciklama</TableCell>
                      <TableCell>Acik_kapali</TableCell>
                      <TableCell>Ayar_degeri</TableCell>
                      <TableCell>Tarih</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <MotorTable items={motors} />
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Card>
        </div>
        <div className="col-12">
          <Card title="Sensörler">
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell>Ad</TableCell>
                      <TableCell>Tip</TableCell>
                      <TableCell>Aciklama</TableCell>
                      <TableCell>Tarih</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <SensorTable items={sensors} />
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Card>
        </div>
      </div>
    </PanelContent>
  );
}
