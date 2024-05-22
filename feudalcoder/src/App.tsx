/**
 * App.tsx
 *
 * Este archivo es el componente RAÍZ de la aplicación y se encarga de renderizar la interfaz de usuario y gestionar el estado de la misma.
 *
 * Funcionalidades:
 * - Renderiza la interfaz de usuario de la aplicación, que incluye un menú de navegación, un canvas de juego, un mapa del mundo, notificaciones y una ventana de diálogo.
 * - Gestiona el estado de la aplicación, incluyendo la carga del juego, la selección de actores, el diálogos y la carga de la caché.
 * - Utiliza hooks de React, como `useState` y `useEffect`, para gestionar el estado y los efectos secundarios de la aplicación.
 */


import React, { useState, useEffect } from 'react';
//import HeaderMenu from '../components/HeaderMenu';
//import GameCanvas from '../components/GameCanvas';
import WorldMap from './components/world-map/world-map';
//import Notifications from '../components/Notifications';
//import DialogWindow from '../components/DialogWindow';

interface AppProps {
    children: React.ReactNode;
  }

const App: React.FC<AppProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [selectedActors, setSelectedActors] = useState([]);

  useEffect(() => {
    // Inicializar la aplicación
    initApp();
  }, []);

  const initApp = async () => {
    // Inicializar la caché
   // await initCache();
    // Renderizar el mapa del mundo
   // await renderWorldMap();
    setLoading(false);
  };

  const handleGameLoad = async () => {
    // Cargar el juego
   // await loadGame();
    setHasSavedGame(true);
  };

  return (
    <div className="rts">
     /**Header menu */
      {loading? (
        <div>Loading...</div>
      ) : (
        <React.Fragment>
          /**GameCanvas */
          <div className="game-ui">
          /**WorldMap */
            {hasSelection && (
              <React.Fragment>
                /**ComandWindowd */
              </React.Fragment>
            )}
          </div>
          /**Notifications */
          {
            /**DialogWindow */
          }
        </React.Fragment>
      )}
    </div>
  );
};

export default App;