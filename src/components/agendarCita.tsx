import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isSameDay } from "date-fns";

const mascotasDummy = [
  { id: 1, nombre: "Firulais" },
  { id: 2, nombre: "Michi" },
];

export const AgendarCita = () => {
  const [mascota, setMascota] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  // Sample unavailable time slots (could be fetched from an API)
  const unavailableSlots: { date: Date; times: string[] }[] = [
    {
      date: new Date(2025, 4, 3), // May 3, 2025
      times: ["09:00", "11:00", "14:00"],
    },
    {
      date: new Date(2025, 4, 4), // May 4, 2025
      times: ["10:00", "13:00"],
    },
  ];

  // Available time slots for selection
  const allTimeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  // Get unavailable times for the selected date
  const getUnavailableTimes = (date: Date | null): string[] => {
    if (!date) return [];
    const unavailable = unavailableSlots.find((slot) =>
      isSameDay(slot.date, date)
    );
    return unavailable ? unavailable.times : [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mascota && fecha && hora && motivo) {
      // Aquí iría la lógica para guardar la cita en el backend
      console.log({
        mascota,
        fecha: fecha ? format(fecha, "yyyy-MM-dd") : "",
        hora,
        motivo,
      });
      alert("¡Cita agendada correctamente!");
      // Reiniciar formulario
      setMascota("");
      setFecha(null);
      setHora("");
      setMotivo("");
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 500,
        mx: "auto",
        border: "2px solidrgba(33, 149, 243, 0.73)", // Colored border for the form container
          borderRadius: 1, // Optional: Rounded corners
          bgcolor:"#2196F3"
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: "#ffffff" }}>
      AGENDAR CITA
      </Typography>
      <Paper
        sx={{
          p: 2,
          
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            select
            label="Mascota"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
            required
          >
            {mascotasDummy.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.nombre}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha"
              value={fecha}
              onChange={(newValue) => {
                setFecha(newValue);
                setHora(""); // Reset time when date changes
              }}
              sx={{ width: "100%" }}
              minDate={new Date()} // Prevent past dates
              slotProps={{
                textField: { required: true },
              }}
            />
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel>Hora</InputLabel>
            <Select
              value={hora}
              label="Hora"
              onChange={(e) => setHora(e.target.value as string)}
              required
              disabled={!fecha}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2196F3",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1976D2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1565C0",
                  },
                },
              }}
            >
              {allTimeSlots.map((time) => (
                <MenuItem
                  key={time}
                  value={time}
                  disabled={getUnavailableTimes(fecha).includes(time)}
                >
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Motivo de la cita"
            multiline
            rows={3}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#2196F3" }}
          >
            Agendar
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
};

export default AgendarCita;