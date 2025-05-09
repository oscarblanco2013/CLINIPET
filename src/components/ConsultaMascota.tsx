import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface Cita {
  id: string;
  fecha: string;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
}

interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  sexo: string;
  edad: number;
  citas: Cita[];
}

const ConsultaMascota = () => {
  const [mascota, setMascota] = useState<Mascota | null>(null);

  useEffect(() => {
    const mascotaEjemplo: Mascota = {
      id: "1",
      nombre: "Luna",
      especie: "Perro",
      raza: "Golden Retriever",
      sexo: "Hembra",
      edad: 5,
      citas: [
        {
          id: "c1",
          fecha: "2024-11-12",
          motivo: "Vacunación",
          diagnostico: "Salud estable",
          tratamiento: "Vacuna antirrábica aplicada",
        },
        {
          id: "c2",
          fecha: "2025-02-20",
          motivo: "Chequeo general",
          diagnostico: "Buena condición física",
          tratamiento: "Revisión completa, sin tratamiento requerido",
        },
      ],
    };

    setMascota(mascotaEjemplo);
  }, []);

  if (!mascota) {
    return (
      <Alert severity="error">
        <AlertTitle>Mascota no encontrada</AlertTitle>
        No se pudo cargar la información de la mascota. Intenta nuevamente.
      </Alert>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Card style={{ marginBottom: "1rem" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Consulta de {mascota.nombre}
          </Typography>
          <Typography><strong>Especie:</strong> {mascota.especie}</Typography>
          <Typography><strong>Raza:</strong> {mascota.raza}</Typography>
          <Typography><strong>Sexo:</strong> {mascota.sexo}</Typography>
          <Typography><strong>Edad:</strong> {mascota.edad} años</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Historial de citas</Typography>
      {mascota.citas.length === 0 ? (
        <Typography>No hay citas registradas.</Typography>
      ) : (
        mascota.citas.map((cita) => (
          <Card key={cita.id} style={{ marginBottom: "1rem" }}>
            <CardContent>
              <Typography variant="subtitle1">
                {new Date(cita.fecha).toLocaleDateString()}
              </Typography>
              <Typography><strong>Motivo:</strong> {cita.motivo}</Typography>
              <Typography><strong>Diagnóstico:</strong> {cita.diagnostico}</Typography>
              <Typography><strong>Tratamiento:</strong> {cita.tratamiento}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ConsultaMascota;
