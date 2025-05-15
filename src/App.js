// src/App.js
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./pages/MapPage";
import QuestionPage from "./pages/QuestionPage";
import ChoicePage from "./pages/ChoicePage";
import FinishPage from "./pages/FinishPage";
import './index.css';
import { IslandProvider } from "./utils/IslandContext";
import gameState from "./utils/gameState";
import { saveGameState } from "./utils/helpers";

export default function App() {
  // Restore game state
  useEffect(() => {

    const saved = localStorage.getItem('gameState');

    if (saved) {
      const data = JSON.parse(saved);
      gameState.userCode = data.userCode;
      gameState.startTime = data.startTime ? new Date(data.startTime) : null;
      gameState.islandCompletionOrder = data.islandCompletionOrder;
      gameState.islandClickOrder = data.islandClickOrder;
      gameState.totalClicksInSession = data.totalClicksInSession;
      gameState.timeBeforeFirstClickSeconds = data.timeBeforeFirstClickSeconds;
      gameState.finishTime = data.finishTime;
      gameState.sessionLength = data.sessionLength;
      gameState.score = data.score;

      // Restore islands
      gameState.islands = data.islands.map(({ islandID, islandData }) => ({
        islandID,
        islandData: {
          question: islandData.question,
          sentiment: islandData.sentiment,
          openTime: islandData.openTime,
          submitTime: islandData.submitTime,
          choiceForAnswer: islandData.choiceForAnswer,
          numberOfQueryTermsPerQuery: islandData.numberOfQueryTermsPerQuery,
          AIAnswers: islandData.AIAnswers,
          SERPAnswers: islandData.SERPAnswers,
          userAnswer: islandData.userAnswer,
        },
      }));
    }
  }, []);


  useEffect(() => {

    const handleClick = () => {

      if (gameState.startTime) {

        if (gameState.totalClicksInSession === 0) {
          const currentTime = new Date();
          const timeBeforeFirstClick = Math.floor((currentTime - gameState.startTime) / 1000);

          gameState.timeBeforeFirstClick = timeBeforeFirstClick;
          saveGameState();

        }

        gameState.totalClicksInSession += 1;
        saveGameState();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', saveGameState());

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', saveGameState());
    };
  }, []);


  return (
    <div id="app-container">
      <video autoPlay loop muted playsInline id="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <IslandProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/MapPage" element={<MapPage />} />
            <Route
              path="/MapPage/:questionId/:AI_flag"
              element={<QuestionPage />}
            />
            <Route
              path="/MapPage/choice/:questionId"
              element={<ChoicePage />}
            />
            <Route path="/FinishPage" element={<FinishPage />} />
          </Routes>
        </Router>
      </IslandProvider>
    </div>
  );
}
