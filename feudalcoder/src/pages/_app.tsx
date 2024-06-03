// _app.js
import React from 'react';
import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';

// Corrige los tipos de los parámetros de MyApp
function MyApp({ Component, pageProps }: AppProps & { Component: NextComponentType }) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;
