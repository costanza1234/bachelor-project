import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./pages/MapPage";
import QuestionPage from "./pages/QuestionPage";
import { MantineProvider } from "@mantine/core";


export default function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MapPage" element={<MapPage />} />
          <Route path="/MapPage/:questionId" element={<QuestionPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}