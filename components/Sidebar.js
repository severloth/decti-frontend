// Sidebar.js
import { Drawer, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Footer from './Footer';

const Sidebar = ({ user, drawerOpen, toggleDrawer, navigationLinks }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleProfileClick = () => {
    router.push({
      pathname: '/profile',
    });
  };

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        <ListItem>
          <Typography variant="h6">{user ? user.name : 'Usuario'}</Typography>
        </ListItem>
        <Divider />
        {navigationLinks.map((link, index) => (
          <ListItem button key={index} onClick={() => router.push(link.path)}>
            <ListItemText primary={link.text} user={user} />
          </ListItem>
        ))}
        <ListItem button onClick={handleProfileClick}> {/* Agrega el manejador de clic para el enlace de perfil */}
          <ListItemText primary="Perfil" />
        </ListItem>
      </List>
      <Footer handleLogout={handleLogout} />
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
