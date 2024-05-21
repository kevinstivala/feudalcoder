// components/App.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  // Usar la store Redux aquí
  return <div>Hello World!</div>;
};

export default App;