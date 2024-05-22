import { createSlice } from '@reduxjs/toolkit';
import { CameraActions } from '../definitions/camera-actions'
import gameStore from './game'

interface CameraState {
  x: number;
  y: number;
}

const initialState: CameraState = {
  x: 0,
  y: 0,
};

type CameraStoreActions = {
    setCameraX: ( value: number ) => void;
    setCameraY: ( value: number ) => void;
    moveCamera: ( direction: CameraActions ) => void;
};

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  selectors: {
    cameraX: (state) => gameStore.world.x,
    cameraY: (state) => gameStore.world.y,
  },
  reducers: {
    setCameraX: (state, action) => {
        const game = gameStore()
        game.world.x = 0
      state.x = action.payload;
    },
    setCameraY: (state, action) => {
        const game = gameStore()
        game.world.x = 0
      state.y = action.payload;
    },
    moveCamera: (state, action) => {
      switch (action.payload.direction) {
        case 'PAN_LEFT':
          state.x -= action.payload.speed;
          state.y += action.payload.speed;
          break;
        case 'PAN_RIGHT':
          state.x += action.payload.speed;
          state.y -= action.payload.speed;
          break;
        case 'PAN_UP':
          state.y -= action.payload.speed;
          state.x -= action.payload.speed;
          break;
        case 'PAN_DOWN':
          state.y += action.payload.speed;
          state.x += action.payload.speed;
          break;
        case 'PAN_LEFT_AND_UP':
          state.x -= action.payload.speed;
          break;
        case 'PAN_LEFT_AND_DOWN':
          state.y += action.payload.speed;
          break;
        case 'PAN_RIGHT_AND_UP':
          state.y -= action.payload.speed;
          break;
        case 'PAN_RIGHT_AND_DOWN':
          state.x += action.payload.speed;
          break;
        default:
          break;
      }
    },
  },
});

export const { setCameraX, setCameraY, moveCamera } = cameraSlice.actions;
export default cameraSlice.reducer;