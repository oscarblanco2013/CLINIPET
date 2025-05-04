import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import jsPDF from "jspdf";

const mockMascotas = [
  { id: "1", nombre: "Firulais" },
  { id: "2", nombre: "Michi" },
];

const mockCitas = [
  {
    id: "c1",
    mascotaId: "1",
    fecha: "2024-01-10",
    motivo: "Vacunación",
    observaciones: "Todo normal",
  },
  {
    id: "c2",
    mascotaId: "1",
    fecha: "2024-03-05",
    motivo: "Revisión anual",
    observaciones: "Buena salud",
  },
  {
    id: "c3",
    mascotaId: "2",
    fecha: "2024-02-14",
    motivo: "Desparasitación",
    observaciones: "Leve diarrea",
  },
];

const logoBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAFWCAYAAAD+No9oAACpzUl..."; // Asegúrate de que este base64 esté completo
const signatureBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAImCAAAAABmpSx3AAEAAEl..."; // Asegúrate de que este base64 esté completo

export const Medical_history = () => {
  const [selectedPet, setSelectedPet] = useState("1");

  const citasFiltradas = mockCitas.filter((c) => c.mascotaId === selectedPet);
  const mascota = mockMascotas.find((m) => m.id === selectedPet);

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Agregar logo
    doc.addImage(logoBase64, "PNG", 10, 10, 30, 30);
    doc.setFontSize(22);
    doc.text("CLINIPET - Historial Médico", 50, 20);

    doc.setFontSize(14);
    doc.text(`Mascota: ${mascota?.nombre}`, 10, 50);
    doc.text(
      `Fecha de exportación: ${new Date().toLocaleDateString()}`,
      10,
      60
    );

    let y = 80;
    citasFiltradas.forEach((cita, i) => {
      doc.text(`Fecha: ${cita.fecha}`, 10, y);
      doc.text(`Motivo: ${cita.motivo}`, 10, y + 10);
      doc.text(`Observaciones: ${cita.observaciones}`, 10, y + 20);
      y += 35;
    });

    // Agregar firma
    if (signatureBase64) {
      doc.addImage(signatureBase64, "PNG", 140, y, 50, 20);
      doc.text("Dr. Veterinario", 145, y + 25);
    } else {
      console.log("No se encontró la firma");
    }

    // Guardar el PDF
    doc.save(`historial_${mascota?.nombre}.pdf`);
  };

  return (
    <Stack spacing={3} p={4}>
      <Typography variant="h4">Historial Médico</Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Selecciona una mascota:</Typography>
        <Select
          value={selectedPet}
          onChange={(e) => setSelectedPet(e.target.value)}
          size="small"
        >
          {mockMascotas.map((mascota) => (
            <MenuItem key={mascota.id} value={mascota.id}>
              {mascota.nombre}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citasFiltradas.map((cita) => (
              <TableRow key={cita.id}>
                <TableCell>{cita.fecha}</TableCell>
                <TableCell>{cita.motivo}</TableCell>
                <TableCell>{cita.observaciones}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={exportToPDF}>
        Exportar PDF
      </Button>
    </Stack>
  );
};
