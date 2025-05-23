import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameStartPage from './pages/GameStartPage';
import MapPage from './pages/MapPage';
import QuestionPage from './pages/QuestionPage';
import ChoicePage from './pages/ChoicePage';
import FinishPage from './pages/FinishPage';
import ChooseLanguagePage from './pages/ChooseLanguagePage';
import './index.css';
import { useGameState } from './utils/GameStateContext';


/**
 * The main application component that initializes game state tracking and sets up routing.
 *
 * - Sets up a global click event listener to update the game state.
 *   - On the first click after the game starts, computes the delay from the start time.
 *   - Increments the total click count on each click.
 * - Renders a full-screen background video with an overlay mask.
 * - Configures client-side routing with multiple routes for navigation, including:
 *   - Language selection, game start, map, question details, choices, and finish pages.
 *
 * @returns {JSX.Element} The rendered React application.
 */
export default function App() {

  const { gameState, update } = useGameState();

  // Track first click
  useEffect(() => {
    const handleClick = () => {

      if (gameState.startTime) {
        if (gameState.totalClicksInSession === 0) {
          const now = new Date();
          const seconds = Math.floor((now - gameState.startTime) / 1000);
          update({ timeBeforeFirstClick_seconds: seconds });
        }
        update({ totalClicksInSession: gameState.totalClicksInSession + 1 });
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [ gameState.startTime, gameState.totalClicksInSession, update ]);

  return (
    <div id="app-container">
      <video autoPlay loop muted playsInline id="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div id="video-mask"></div>

      <Router>
        <Routes>
          <Route path="/" element={<ChooseLanguagePage />} />
          <Route path="/GameStart" element={<GameStartPage />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/MapPage/:questionId/:AI_flag" element={<QuestionPage />} />
          <Route path="/MapPage/choice/:questionId" element={<ChoicePage />} />
          <Route path="/FinishPage" element={<FinishPage />} />
        </Routes>
      </Router>
    </div>
  );
}

