// main.tsx

import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './helpers/reducers'; // Importa el rootReducer adecuado

// Configura la tienda Redux
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Crea el wrapper con la tienda
const wrapper = createWrapper(() => store);

export default wrapper;
