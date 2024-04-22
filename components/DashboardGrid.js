// DashboardGrid.js
import { Grid, Box, Typography, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';

const DashboardGrid = ({ membershipId }) => {
  const router = useRouter();

  const adminActions = [
    { title: 'Articulos', icon: <AssignmentIcon />, path: '/articles', color: '#ffcc80' },
    { title: 'Cursos', icon: <AccessTimeIcon />, path: '/courses', color: '#ef9a9a' },
    { title: 'Usuarios Registrados', icon: <PeopleIcon />, path: '/registered-users', color: '#ce93d8' },
    { title: 'Empresas registradas', icon: <BusinessIcon />, path: '/registered-companies', color: '#90caf9' },
    { title: 'Reservar espacios', icon: <EventIcon />, path: '/book-spaces', color: '#a5d6a7' },
    { title: 'Reservas existentes', icon: <EventIcon />, path: '/existing-bookings', color: '#80cbc4' },
  ];

  const userActions = [
    { title: 'Reservar espacios', icon: <EventIcon />, path: '/book-spaces', color: '#b39ddb' },
    { title: 'Reservas existentes', icon: <EventIcon />, path: '/existing-bookings', color: '#81c784' },
  ];

  const actions = membershipId === 1 ? adminActions : userActions;

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <Grid container spacing={2}>
      {actions.map((action, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Box
            sx={{
              width: '100%',
              height: '200px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${action.color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => handleClick(action.path)}
          >
            <IconButton sx={{ fontSize: '40px', color: action.color }}>
              {action.icon}
            </IconButton>
            <Typography variant="h6" align="center">{action.title}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardGrid;
