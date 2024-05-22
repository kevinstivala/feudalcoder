/* Aqui se debe generar el world map como Componente*/

import React from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
//import { setCameraX, setCameraY } from '../store';
import styles from "./WorldMap.module.css";
import { useEffect, useRef } from "react";

const cameraPositionSelector = createSelector(
  (state) => state.camera.cameraX,
  (state) => state.camera.cameraY,
  (cameraX, cameraY) => ({
    left: `${cameraX * CVS_2D_MAGNIFIER}px`,
    top: `${cameraY * CVS_2D_MAGNIFIER}px`,
  })
);

const WorldMap = () => {
  const mapContainerRef = useRef(null);
  const cameraPosition = useSelector(cameraPositionSelector);

  const dispatch = useDispatch();
  const cameraX = useSelector((state) => state.cameraX);
  const cameraY = useSelector((state) => state.cameraY);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapContainerRef.current.appendChild(CACHE.map.flat);
    }
  }, []); // arreglo vacío

  const handleCameraXChange = (event: { target: { value: any } }) => {
    dispatch(setCameraX(event.target.value));
  };

  const handleCameraYChange = (event: { target: { value: any } }) => {
    dispatch(setCameraY(event.target.value));
  };

  return (
    <div className={styles.worldMapContainer}>
      <div className={styles.mapContainer}>
        <input
          type="range"
          min="-100"
          max="100"
          value={cameraX}
          onChange={handleCameraXChange}
        />
        <input
          type="range"
          min="-100"
          max="100"
          value={cameraY}
          onChange={handleCameraYChange}
        />
      </div>
      <div className={styles.cameraPosition} style={cameraPosition} />
    </div>
  );
};

export default WorldMap;
