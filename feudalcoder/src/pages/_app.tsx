// pages/_app.tsx

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import wrapper from '../main'; // Importa el wrapper desde main.tsx

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={wrapper}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
