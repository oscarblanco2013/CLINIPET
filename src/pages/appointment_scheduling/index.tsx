import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Appointment = () => { // Nombre del componente en mayúscula
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/appointment");
    }
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/appointment");
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      spacing={2}
    >
      <Typography variant="h4">Welcome appointment</Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Stack>
  );
};
