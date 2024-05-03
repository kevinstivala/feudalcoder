import { configureStore, createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { TileDef, TileTypes } from '@/definitions/world-tiles';

// Definir la acción utilizando createAction de Redux Toolkit
const addObject = createAction<any>('ADD_OBJECT');

// Definir el estado inicial
interface RootState {
    terrain: TileDef[];
}

const initialState: RootState = {
    terrain: [
        // 3 x 3 square of water
        { x: 0, y: 0, height: 1, type: TileTypes.WATER },
        { x: 1, y: 0, height: 1, type: TileTypes.WATER },
        { x: 2, y: 0, height: 1, type: TileTypes.WATER },
        { x: 0, y: 1, height: 1, type: TileTypes.WATER },
        { x: 1, y: 1, height: 1, type: TileTypes.WATER },
        { x: 2, y: 1, height: 1, type: TileTypes.WATER },
        { x: 0, y: 2, height: 1, type: TileTypes.WATER },
        { x: 1, y: 2, height: 1, type: TileTypes.WATER },
        { x: 2, y: 2, height: 1, type: TileTypes.WATER },

        // 1 x 3 strip of land
        { x: 0, y: 1, height: 1, type: TileTypes.GROUND },
        { x: 1, y: 1, height: 2, type: TileTypes.GROUND },
        { x: 2, y: 1, height: 1, type: TileTypes.GROUND },
    ],
};

// Definir el reducer utilizando createReducer de Redux Toolkit
const reducer = createReducer(initialState, (builder) => {
    builder.addCase(addObject, (state, action: PayloadAction<any>) => {
        // Lógica para agregar un objeto al estado
        state.terrain.push(action.payload);
    });
});

// Crear el store Redux
const store = configureStore({
    reducer,
    // Opcional: configuración adicional
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production', // Activar Redux DevTools Extension solo en desarrollo
});

// Custom hook para acceder al estado y despachar acciones
export const useWorldStore = () => {
    const terrain = useSelector((state: RootState) => state.terrain);
    const dispatch = useDispatch();

    const addObjectAction = (obj: any) => dispatch(addObject(obj));

    return { terrain, addObjectAction };
};


