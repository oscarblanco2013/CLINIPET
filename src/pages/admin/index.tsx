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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/image.png";

const drawerWidth = 240;

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPetRows = petRows.filter((row) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      row.id.toString().includes(searchValue) ||
      row.name.toLowerCase().includes(searchValue) ||
      row.species.toLowerCase().includes(searchValue) ||
      row.race.toLowerCase().includes(searchValue) ||
      row.sex.toLowerCase().includes(searchValue) ||
      row.age.toString().includes(searchValue) ||
      row.owners_name.toLowerCase().includes(searchValue) ||
      row.phone.toString().includes(searchValue)
    );
  });

  const renderContent = () => {
    switch (selectedModule) {
      case "mascotas":
        return (
          <Paper>
            <TextField
              label="Buscar mascota"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#2196F3" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>ID</TableCell>
                    <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                    <TableCell sx={{ color: "white" }}>Especie</TableCell>
                    <TableCell sx={{ color: "white" }}>Raza</TableCell>
                    <TableCell sx={{ color: "white" }}>Sexo</TableCell>
                    <TableCell sx={{ color: "white" }}>Edad</TableCell>
                    <TableCell sx={{ color: "white" }}>Propietario</TableCell>
                    <TableCell sx={{ color: "white" }}>Teléfono</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPetRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.species}</TableCell>
                        <TableCell>{row.race}</TableCell>
                        <TableCell>{row.sex}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.owners_name}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredPetRows.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10]}
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
