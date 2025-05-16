import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MapPage from './pages/MapPage';
import QuestionPage from './pages/QuestionPage';
import ChoicePage from './pages/ChoicePage';
import FinishPage from './pages/FinishPage';
import './index.css';
import { useGameState } from './utils/GameStateContext';

export default function App() {
  const { gameState, update } = useGameState();

  // Track first click
  useEffect(() => {
    const handleClick = () => {

      if (gameState.startTime) {
        if (gameState.totalClicksInSession === 0) {
          const now = new Date();
          const seconds = Math.floor((now - gameState.startTime) / 1000);
          update({ timeBeforeFirstClickSeconds: seconds });
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

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/MapPage/:questionId/:AI_flag" element={<QuestionPage />} />
          <Route path="/MapPage/choice/:questionId" element={<ChoicePage />} />
          <Route path="/FinishPage" element={<FinishPage />} />
        </Routes>
      </Router>
    </div>
  );
}

