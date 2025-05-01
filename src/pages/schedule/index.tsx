import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Schedule = () => { // Nombre del componente en mayúscula
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/schedule");
    }
  }, [navigate]); // Añadir navigate a las dependencias

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/schedule");
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      spacing={2}
    >
      <Typography variant="h4">Welcome schedule</Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Stack>
  );
};
