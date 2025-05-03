import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import imagen from "../../assets/image.png";
import { AgendarCita } from "../../components/agendarCita.tsx";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Iconos de Material UI
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";

// Valor fijo del ancho del drawer
const drawerWidth = 240;

// Puedes cambiar esto por una importación real si tienes un logo
export const User = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState(""); // <- página de bienvenida por defecto

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const renderContent = () => {
    switch (selectedModule) {
      case "mascotas":
        return "";
      case "citas":
        return <AgendarCita />;
      case "historiales":
        return <div>Contenido del módulo Historiales</div>;
      case "":
      default:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              ¡Bienvenido al panel de usuario!
            </Typography>
            <Typography variant="body1">
              Selecciona un módulo del menú lateral para comenzar.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2196F3",
            color: "#ffffff",
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          p={2}
          gap={1}
          justifyItems={"center"}
        >
          <Box component="img" src={imagen} alt="Logo" width={120} />
        </Box>
        <Divider />
        <List>
          <ListItem
            button
            selected={selectedModule === "mascotas"}
            onClick={() => setSelectedModule("mascotas")}
          >
            <ListItemIcon>
              <PetsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Registrar Mascota" />
          </ListItem>
          <ListItem
            button
            selected={selectedModule === "citas"}
            onClick={() => setSelectedModule("citas")}
          >
            <ListItemIcon>
              <EventIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Agendar Citas" />
          </ListItem>
        </List>
        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#ffffff",
          p: 3,
          minHeight: "100vh",
          color: "#2196F3",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {selectedModule
            ? `Módulo: ${
                selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)
              }`
            : "Bienvenido"}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};
