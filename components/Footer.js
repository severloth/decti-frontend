// Footer.js
import { Box, Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';

const Footer = ({ handleLogout }) => {
  const router = useRouter();

  return (
    <Box sx={{ mt: 'auto', p: 2 }}>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ExitToAppIcon />}
        onClick={handleLogout}
        fullWidth
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default Footer;
