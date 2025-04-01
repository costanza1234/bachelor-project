import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./pages/MapPage";
import QuestionPage from "./pages/QuestionPage";
import ChoicePage from "./pages/ChoicePage";
import './index.css';

export default function App() {
  return (
    <div id="app-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        id="background-video"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/MapPage/:questionId/:AI_flag" element={<QuestionPage />} />
          <Route path="/MapPage/choice/:questionId" element={<ChoicePage />} />
        </Routes>
      </Router>
    </div>
  );
}