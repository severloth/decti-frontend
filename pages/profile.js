import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Divider, Container, AppBar, Toolbar, IconButton, CircularProgress, Snackbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Profile = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Estado para mostrar el loader de guardado
  const [success, setSuccess] = useState(false); // Estado para indicar si la operación fue exitosa
  const [error, setError] = useState(false); // Estado para indicar si hubo un error
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para abrir/cerrar el Snackbar

  // Estados para los campos modificables
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dni, setDni] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const convertDateFormat = (dateString) => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateString; // Devuelve la fecha sin cambios si el formato no es válido
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setName(userData.name || '');
          setLastname(userData.lastname || '');
          setDni(userData.dni || '');
          setDateOfBirth(userData.date_of_birth || '');
          setGender(userData.gender || '');
          setEmail(userData.email || '');
        } else {
          console.error('Error al obtener los datos del usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Función para abrir/cerrar el Sidebar
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Manejadores de cambio para los campos modificables
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleDniChange = (event) => {
    setDni(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Función para enviar los datos actualizados al servidor
  const handleSubmit = async () => {
    setSaving(true); // Mostrar el loader
    setSuccess(false); // Reiniciar el estado de éxito
    setError(false); // Reiniciar el estado de error

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name,
          lastname,
          dni,
          date_of_birth: convertDateFormat(dateOfBirth), // Convertir el formato de la fecha de nacimiento
          gender,
        }),
      });

      if (response.ok) {
        console.log('Datos actualizados correctamente');
        setSuccess(true);
        setSnackbarOpen(true); // Abrir el Snackbar de éxito
        // Puedes redirigir al usuario o mostrar un mensaje de éxito aquí
      } else {
        console.error('Error al actualizar los datos del usuario:', response.statusText);
        setError(true);
        setSnackbarOpen(true); // Abrir el Snackbar de error
        // Puedes mostrar un mensaje de error aquí
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      setError(true);
      setSnackbarOpen(true); // Abrir el Snackbar de error
      // Puedes mostrar un mensaje de error aquí
    } finally {
      setSaving(false); // Ocultar el loader
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Perfil de Usuario
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar user={user} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} navigationLinks={[{ text: 'Inicio', path: '/' }]} />
      <Container>
        <Box mt={4} p={3} border="1px solid #ccc" borderRadius={5}>
          <Typography variant="h5" gutterBottom>
            Datos Personales
          </Typography>
          <Divider />
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="username"
                  label="Nombre de usuario"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={user.username}
                  disabled
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  label="Nombre"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  id="lastname"
                  label="Apellido"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={lastname}
                  onChange={handleLastnameChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="dni"
                  label="DNI"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                  value={dni}
                  onChange={handleDniChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="dateOfBirth"
                  label="Fecha de Nacimiento"
                  variant="outlined"
                  type="date"
                  size="small"
                  fullWidth
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="gender"
                  label="Género"
                  variant="outlined"
                  select
                  size="small"
                  fullWidth
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="m">Masculino</option>
                  <option value="f">Femenino</option>
                  <option value="x">Prefiero no responder</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {saving ? <CircularProgress size={24} color="inherit" /> : 'Guardar cambios'}
            </Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Box
              sx={{
                backgroundColor: success ? '#4caf50' : '#f44336',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: 4,
              }}
            >
              {success ? <CheckCircleIcon sx={{ mr: 1 }} /> : <ErrorIcon sx={{ mr: 1 }} />}
              <Typography variant="body1">
                {success ? 'Datos actualizados correctamente' : 'Error al actualizar los datos'}
              </Typography>
            </Box>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
