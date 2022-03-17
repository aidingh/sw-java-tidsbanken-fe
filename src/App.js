import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import LoginPage from "./Views/LoginPage";
import ProfilePage from "./Views/ProfilePage";
import CalendarView from "./Views/CalendarPage";
/**
 * @return {Component} The app component
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="calendar" element={<CalendarView />} />
      </Routes>
    </Router>
  );
}

export default App;
