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
        formData.email === "admin@admin.com" &&
        formData.password === "admin"
      ) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin");
      } else if (
        formData.email === parsedUser.email &&
        formData.password === parsedUser.password
      ) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/user");
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
    navigate("/forget_password"); // Cambia a la ruta de recuperación de contraseña
    // O puedes navegar a una ruta futura: navigate("/forgot-password")
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
        width={300}
        height={420}
      >
        <Box display="flex" justifyContent="center">
          <Box component="img" src={logo} alt="Logo" width={130} />
        </Box>
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
        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: "#2196F3", "&:hover": { bgcolor: "#42A5F5" } }}
        >
          Iniciar Sesión
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/register")}
          sx={{ color: "#2196F3" }}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
        <Button
          variant="text"
          onClick={handleForgotPassword}
          sx={{ color: "#2196F3" }}
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </Stack>
    </Stack>
  );
};
