import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import ProfilePage from "./Components/ProfilePage";
import CalendarView from "./Components/CalendarView";
import LoadingSpinner from "./Components/Elements/LoadingSpinner";
import { PersistGate } from 'redux-persist/integration/react'
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
