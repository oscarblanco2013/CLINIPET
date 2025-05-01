import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Update_password = () => { // Nombre del componente en mayúscula
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/update_password");
    }
  }, [navigate]); // Añadir navigate a las dependencias

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/update_password");
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      spacing={2}
    >
      <Typography variant="h4">Welcome update_password</Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Stack>
  );
};
