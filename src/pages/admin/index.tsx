import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/image.png";

const drawerWidth = 240;
const petColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 170 },
  { field: "species", headerName: "Species", width: 170 },
  { field: "race", headerName: "Race", width: 170 },
  { field: "sex", headerName: "Sex", width: 130 },
  { field: "age", headerName: "Age", width: 70, type: "number" },
  { field: "owners_name", headerName: "Owner's Name", width: 170 },
  { field: "phone", headerName: "Phone", width: 130 },
];

const petRows = [
  {
    id: 1,
    name: "Tony",
    species: "Perro",
    race: "Pitbull",
    sex: "Macho",
    age: 2,
    owners_name: "Oscar",
    phone: 123456789,
  },
  {
    id: 2,
    name: "Luna",
    species: "Gato",
    race: "Persa",
    sex: "Hembra",
    age: 3,
    owners_name: "Ana",
    phone: 987654321,
  },
  {
    id: 3,
    name: "Max",
    species: "Perro",
    race: "Labrador",
    sex: "Macho",
    age: 1,
    owners_name: "Luis",
    phone: 456789123,
  },
  {
    id: 4,
    name: "Bella",
    species: "Gato",
    race: "Siames",
    sex: "Hembra",
    age: 4,
    owners_name: "Maria",
    phone: 321654987,
  },
  {
    id: 5,
    name: "Rocky",
    species: "Perro",
    race: "Bulldog",
    sex: "Macho",
    age: 5,
    owners_name: "Carlos",
    phone: 789123456,
  },
];

export const Admin = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState("mascotas");
  const [appointmentsCount] = useState(12);
  const [recordsCount] = useState(28);

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
  const paginationModel = { page: 0, pageSize: 5 };

  const renderContent = () => {
    switch (selectedModule) {
      case "mascotas":
        return (
          <Paper sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <DataGrid
              rows={petRows}
              columns={petColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        );

      case "citas":
        return (
          <Typography variant="h6">
            Total de citas agendadas: {appointmentsCount}
          </Typography>
        );
      case "historiales":
        return (
          <Typography variant="h6">
            Total de historiales registrados: {recordsCount}
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
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
        <Box display="flex" alignItems="center" p={2} gap={1}>
          <Box component="img" src={logo} alt="Logo" width={120} />
          <Typography variant="h5" sx={{ fontSize: "25px" }}>
            Panel Admin
          </Typography>
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
            <ListItemText primary="Mascotas" />
          </ListItem>
          <ListItem
            button
            selected={selectedModule === "citas"}
            onClick={() => setSelectedModule("citas")}
          >
            <ListItemIcon>
              <EventIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Citas" />
          </ListItem>
          <ListItem
            button
            selected={selectedModule === "historiales"}
            onClick={() => setSelectedModule("historiales")}
          >
            <ListItemIcon>
              <HistoryEduIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Historiales" />
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

      {/* Contenido */}
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
          Módulo:{" "}
          {selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};
