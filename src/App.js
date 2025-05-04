// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./pages/MapPage";
import QuestionPage from "./pages/QuestionPage";
import ChoicePage from "./pages/ChoicePage";
import FinishPage from "./pages/FinishPage";
import './index.css';
import { IslandProvider } from "./utils/IslandContext";
import tracker from "./utils/tracker";

export default function App() {

  useEffect(() => {
    const handleClick = () => {

      if (tracker.startTime) {

        if (tracker.totalClicksInSession === 0) {
          const currentTime = new Date();
          const timeBeforeFirstClick = Math.floor((currentTime - tracker.startTime) / 1000);

          tracker.timeBeforeFirstClick = timeBeforeFirstClick;
        }

        tracker.totalClicksInSession += 1;
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);


  return (
    <div id="app-container">
      <video autoPlay loop muted playsInline id="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 3 Provide activeIdx & setter to all pages */}
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
