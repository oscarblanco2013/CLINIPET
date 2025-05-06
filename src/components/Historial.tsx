import React, { useState, ChangeEvent } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";

// Logo de ejemplo (asegúrate de importar o definir esto)
import logoImage from "../assets/Logo.jpeg"; // Ajusta la ruta según tu estructura

// Tipos


type HistorialEntry = {
  id: number;
  petName: string;
  date: string;
  reason: string;
  diagnosis: string;
  treatment: string;
};

// Datos de ejemplo


const medicalHistory: HistorialEntry[] = [
  { id: 1, petName: "Tony", date: "2024-04-01", reason: "Vacunación", diagnosis: "Saludable", treatment: "Vacuna aplicada" },
  { id: 2, petName: "Luna", date: "2024-04-05", reason: "Chequeo general", diagnosis: "Sin anomalías", treatment: "Ninguno" },
  { id: 3, petName: "Bella", date: "2024-04-10", reason: "Infección ocular", diagnosis: "Conjuntivitis", treatment: "Gotas oftálmicas por 7 días" },
];

// Componente principal
export const Historial = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredHistories = medicalHistory.filter((entry: HistorialEntry) =>
    entry.petName.toLowerCase().includes(searchTerm)
  );

  const exportHistorialPDF = (historial: HistorialEntry) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logoImage;

    img.onload = () => {
      doc.addImage(img, "JPEG", 10, 10, 30, 30);
      doc.setFontSize(18);
      doc.text("CLINIPET - Historial Médico", 50, 20);

      doc.setFontSize(12);
      doc.text(`Fecha: ${historial.date}`, 50, 30);
      doc.text(`Nombre de la Mascota: ${historial.petName}`, 50, 40);
      doc.text(`Motivo: ${historial.reason}`, 50, 50);
      doc.text(`Diagnóstico: ${historial.diagnosis}`, 50, 60);
      doc.text(`Tratamiento: ${historial.treatment}`, 50, 70);

      doc.setFontSize(10);
      doc.text("Firma del Veterinario:", 50, 100);
      doc.line(50, 102, 150, 102);

      doc.setFontSize(8);
      doc.text("CLINIPET - Tu clínica veterinaria de confianza", 50, 280, {
        align: "center",
      });

      doc.save(`historial_${historial.petName}.pdf`);
    };
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <TextField
        label="Buscar mascota"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#2196F3" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white" }}>Fecha</TableCell>
              <TableCell sx={{ color: "white" }}>Motivo</TableCell>
              <TableCell sx={{ color: "white" }}>Diagnóstico</TableCell>
              <TableCell sx={{ color: "white" }}>Tratamiento</TableCell>
              <TableCell sx={{ color: "white" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistories.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.petName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.diagnosis}</TableCell>
                <TableCell>{row.treatment}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => exportHistorialPDF(row)}
                  >
                    Exportar PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Historial;