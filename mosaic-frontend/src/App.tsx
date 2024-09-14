// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Mosaics from "./pages/Mosaics";
import GlobalView from "./pages/GlobalView";
import UserSettings from "./pages/UserSettings";
import GraphEditorPage from "./pages/GraphEditorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mosaics" element={<Mosaics />} />
        <Route path="/global-view" element={<GlobalView />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/graph/:graphId" element={<GraphEditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
