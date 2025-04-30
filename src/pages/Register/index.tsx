import { Stack, TextField, SxProps, Theme, Button, Box } from "@mui/material";
import logo from "../../assets/Logo.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stylesInput: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#2196F3",
    },
    "&:hover fieldset": {
      borderColor: "#2196F3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2196F3",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#2196F3",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2196F3",
  },
  "& .MuiInputBase-input": {
    color: "#2196F3",
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
      bgcolor="#2196F3"
      component="main"
    >
      <Stack
        bgcolor="#ffff"
        gap={2}
        p={5}
        borderRadius="16px"
        component="form"
        onSubmit={handleSubmit}
        width={400}
      >
        <Box display="flex" justifyContent="center">
          <Box component="img" src={logo} alt="Logo" width={130} />/
        </Box>
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
        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: "#2196F3", "&:hover": { bgcolor: "#42A5F5" } }}
        >
          Registrarse
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/login")}
          sx={{ color: "#2196F3" }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </Stack>
    </Stack>
  );
};
