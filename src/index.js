import ReactDOM from 'react-dom/client';
import './index.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';
import { GameStateProvider } from './utils/GameStateContext';

/**
 * The root element for the React application.
 *
 * This element serves as the mounting point where the entire React component tree is rendered.
 * It is created using ReactDOM.createRoot and is identified by the DOM element with the id "root".
 *
 * @constant {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <GameStateProvider>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </GameStateProvider>
);


