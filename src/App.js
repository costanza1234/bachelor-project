import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./pages/MapPage";
import QuestionPage from "./pages/QuestionPage";
import './index.css';


export default function App() {
  return (
    <>
      <video autoPlay muted loop id="bgVideo">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/MapPage/:questionId" element={<QuestionPage />} />
        </Routes>
      </Router>
    </>
  );

}