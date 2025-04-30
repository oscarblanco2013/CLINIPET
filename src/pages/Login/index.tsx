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

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (
        formData.email === parsedUser.email &&
        formData.password === parsedUser.password
      ) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/home");
      } else {
        alert("Credenciales incorrectas");
      }
    } else {
      alert("No hay usuarios registrados");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgotPassword = () => {
    alert("Funcionalidad de recuperación de contraseña aún no implementada.");
    // O puedes navegar a una ruta futura: navigate("/forgot-password")
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
          label="Email"
          variant="outlined"
          sx={stylesInput}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          sx={stylesInput}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Iniciar Sesión
        </Button>
        <Button variant="text" onClick={() => navigate("/register")}>
          ¿No tienes cuenta? Regístrate
        </Button>
        <Button variant="text" onClick={handleForgotPassword}>
          ¿Olvidaste tu contraseña?
        </Button>
      </Stack>
    </Stack>
  );
};
