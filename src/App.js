// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./pages/MapPage";
import QuestionPage from "./pages/QuestionPage";
import ChoicePage from "./pages/ChoicePage";
import './index.css';
import { IslandContext } from "./utils/IslandContext";

export default function App() {
  // 1 Load last unlocked index or start at 0
  const [ activeIdx, setActiveIdx ] = useState(() => {
    const stored = localStorage.getItem('activeIslandIdx');
    return stored ? Number(stored) : 0;
  });

  // 2 Persist whenever it changes
  useEffect(() => {
    localStorage.setItem('activeIslandIdx', activeIdx);
  }, [ activeIdx ]);

  return (
    <div id="app-container">
      <video autoPlay loop muted playsInline id="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 3 Provide activeIdx & setter to all pages */}
      <IslandContext.Provider value={{ activeIdx, setActiveIdx }}>
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
          </Routes>
        </Router>
      </IslandContext.Provider>
    </div>
  );
}
