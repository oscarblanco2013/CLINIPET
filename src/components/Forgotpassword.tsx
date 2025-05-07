import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Stack, Paper } from '@mui/material';
import emailjs from 'emailjs-com';

interface ForgotPasswordProps {
  onSubmitEmail: (email: string) => Promise<void>;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSubmitEmail }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    try {
      setLoading(true);

      // Llama a EmailJS para enviar el correo
      const result = await emailjs.send(
        'service_wz45a6z',    // Tu Service ID
        'template_uklv8kp',   // Tu Template ID
        { email: email },       // El parámetro que pasas a la plantilla (usar el email del estado)
        'X-mlIS9efLhwpct0_'    // Tu Public Key (User ID)
      );

      setMessage('Se ha enviado un enlace de recuperación a tu correo.');
      setEmail(''); // Limpiar el campo de correo después de enviar
    } catch (err: any) {
      console.error('Error al enviar correo:', err);
      setError('Hubo un error al enviar el correo. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Recuperar contraseña
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            <TextField
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              disabled={loading}  // Deshabilitar el campo mientras se está enviando el correo
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              fullWidth
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
