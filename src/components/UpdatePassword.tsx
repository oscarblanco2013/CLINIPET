import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockResetIcon from "@mui/icons-material/LockReset";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setSuccess("Contraseña actualizada con éxito");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        "Hubo un error al actualizar la contraseña. Intenta nuevamente."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right,#2196F3, #2575fc)",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: "#fff",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            sx={{ fontWeight: 700, color: "#2196F3", mb: 1 }}
          >
            Actualizar Contraseña
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: "gray", mb: 3 }}
          >
            Ingresa tu nueva contraseña para continuar.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item={true} xs={12}>
                <TextField
                  fullWidth
                  label="Nueva Contraseña"
                  type="password"
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Nueva Contraseña"
                  type="password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              {success && (
                <Grid item xs={12}>
                  <Alert severity="success">{success}</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<LockResetIcon />}
                  sx={{
                    background: "linear-gradient(to right, #2196F3, #2575fc)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 3,
                    paddingY: 1.5,
                    px: 4,
                    mx: "auto", // este sí funcionará correctamente ahora
                    display: "block", // necesario para aplicar mx auto en botones
                    "&:hover": {
                      background: "linear-gradient(to right, #2196F3, #1f5ddb)",
                    },
                  }}
                >
                  Actualizar Contraseña
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default UpdatePassword;
