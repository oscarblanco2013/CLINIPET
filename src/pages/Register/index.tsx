import {
  Stack,
  TextField,
  SxProps,
  Theme,
  Button,
  Box,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stylesInput: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
};

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Guardar datos del usuario
    const userToSave = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(userToSave));

    // Redirige al login
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#242e34"
      component="main"
    >
      <Stack
        bgcolor="#0d253f"
        gap={2}
        p={5}
        borderRadius="16px"
        component="form"
        onSubmit={handleSubmit}
      >
        <Box component="img" src={logo} alt="Logo" />
        <TextField
          label="Nombre"
          variant="outlined"
          sx={stylesInput}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          sx={stylesInput}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          sx={stylesInput}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirmar Contraseña"
          variant="outlined"
          sx={stylesInput}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Registrarse
        </Button>
        <Button variant="text" onClick={() => navigate("/login")}>
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </Stack>
    </Stack>
  );
};
