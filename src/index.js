import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';
import { GameProvider } from './utils/GameContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <GameProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </GameProvider>
  </React.StrictMode>
);


