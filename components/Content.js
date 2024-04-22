// Content.js
import { Typography, Container, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardGrid from './DashboardGrid';

const Content = ({ user, toggleDrawer }) => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Página Principal
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ flexGrow: 1, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user ? user.name : 'Usuario'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Contenido principal de la página.
        </Typography>
        {/* Aquí puedes agregar más contenido */}
    
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Typography variant="body2" color="textSecondary" align="center">
          Información adicional del pie de página.
        </Typography>
      </Box>
      <DashboardGrid membershipId={user.membership_id} />
      </Container>

    </Box>
  );
};

export default Content;
