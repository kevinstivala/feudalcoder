// pages/index.tsx
import React, { useEffect, useState } from 'react';
import BuildingDrawer from '@/components/buildDrawer';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { getPuntos, actualizarPuntos } from '../db/mongodb';


export default function Game() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [playerMoney, setPlayerMoney] = useState(5000); // Dinero inicial del jugador

  useEffect(() => {
    async function fetchPlayerMoney() {
      const email = 'kevinstivalalanzi@gmail.com'; // Reemplaza con el email del jugador
      const money = await getPuntos(email);
      setPlayerMoney(money || 0);
    }
    fetchPlayerMoney();
  }, []);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleBuild = async (cost: number) => {
    const newMoney = playerMoney - cost;
    await actualizarPuntos('kevinstivalalanzi@gmail.com', newMoney); // Reemplaza con el email del jugador
    setPlayerMoney(newMoney);
    handleCloseDrawer();
  };


  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Dinero Total: ${playerMoney}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Juego de Construcción
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDrawer}>
          Seleccionar Edificio
        </Button>
      </Box>
      <BuildingDrawer open={drawerOpen} onClose={handleCloseDrawer} onBuild={handleBuild} />
    </Container>
  );
}
