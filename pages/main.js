// Main.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import Content from '@/components/Content';
import DashboardGrid from '@/components/DashboardGrid';

const Main = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);

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


    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    const navigationLinks = [
        { text: 'Inicio', path: '/' },
        { text: 'Perfil', path: '/profile' },
        { text: 'Configuración', path: '/settings' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar user={user} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} navigationLinks={navigationLinks} />
            <Content user={user} toggleDrawer={toggleDrawer} />
        </Box>

    );
};

export default Main;
