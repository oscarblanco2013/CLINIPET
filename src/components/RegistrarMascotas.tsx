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
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";

type PetFormData = {
  name: string;
  species: string;
  breed: string;
  sex: string;
  age: number;
  owner: string;
  phone: string;
};

export const RegistrarMascotas = () => {
  const [formData, setFormData] = useState<PetFormData>({
    name: "",
    species: "",
    breed: "",
    sex: "",
    age: 0,
    owner: "",
    phone: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mascota registrada:", formData);

    // Mostrar notificación
    setOpenSnackbar(true);

    // Limpiar formulario si deseas
    setFormData({
      name: "",
      species: "",
      breed: "",
      sex: "",
      age: 0,
      owner: "",
      phone: "",
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Registrar Mascota
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Especie"
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
        />
        <TextField
          label="Raza"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel>Sexo</InputLabel>
          <Select
            name="sex"
            value={formData.sex}
            label="Sexo"
            onChange={handleChange}
            required
          >
            <MenuItem value="Macho">Macho</MenuItem>
            <MenuItem value="Hembra">Hembra</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Edad"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Registrar
        </Button>
      </Box>

      {/* Snackbar de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Registro exitoso de mascota
        </Alert>
      </Snackbar>
    </Paper>
  );
};
