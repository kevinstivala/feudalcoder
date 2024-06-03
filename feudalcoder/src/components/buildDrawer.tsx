// components/BuildingDrawer.tsx
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


interface Building {
  title: string;
  price: number;
  image: string;
}

interface BuildingDrawerProps {
  open: boolean;
  onClose: () => void;
  onBuild: (price: number) => void;
}

const DrawerContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#001f3f', // Azul marino
  color: '#fff',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: 200,
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  '&:hover': {
    opacity: 0.8,
    transform: 'scale(1.05)',
  },
  cursor: 'pointer',
}));

const StyledMedia = styled(CardMedia)({
  height: 140,
});

const buildings: Building[] = [
  { title: 'Edificio 1', price: 1000, image: '/images/building1.jpg' },
  { title: 'Edificio 2', price: 2000, image: '/images/building2.jpg' },
  { title: 'Edificio 3', price: 3000, image: '/images/building3.jpg' },
  { title: 'Edificio 4', price: 4000, image: '/images/building4.jpg' },
];

const BuildingDrawer: React.FC<BuildingDrawerProps> = ({ open, onClose, onBuild }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  const handleCardClick = (building: Building) => {
    setSelectedBuilding(building);
  };

  const handleCloseDialog = () => {
    setSelectedBuilding(null);
  };

  const handleBuild = () => {
    if (selectedBuilding ) {
      alert(`Construyendo ${selectedBuilding?.title} por $${selectedBuilding?.price}`);
      onBuild(selectedBuilding.price);
      handleCloseDialog();
    } else {
        alert(`No tienes suficiente Dinero para construir: }`);
    }
  };

  return (
    <>
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        <DrawerContainer>
          <Grid container justifyContent="center">
            {buildings.map((building, index) => (
              <Grid item key={index}>
                <StyledCard onClick={() => handleCardClick(building)}>
                  <StyledMedia
                    image={building.image}
                    title={building.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {building.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Precio: ${building.price}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </DrawerContainer>
      </Drawer>

      {selectedBuilding && (
        <Dialog open={Boolean(selectedBuilding)} onClose={handleCloseDialog}>
          <DialogTitle>{selectedBuilding.title}</DialogTitle>
          <DialogContent>
            <StyledMedia
              image={selectedBuilding.image}
              title={selectedBuilding.title}
              style={{ height: 140 }}
            />
            <Typography variant="body1" style={{ marginTop: 16 }}>
              Precio: ${selectedBuilding.price}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleBuild} color="primary">
              Construir
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default BuildingDrawer;
