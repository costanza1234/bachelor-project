import ReactDOM from 'react-dom/client';
import './index.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';
import { GameStateProvider } from './utils/GameStateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <GameStateProvider>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </GameStateProvider>
);


