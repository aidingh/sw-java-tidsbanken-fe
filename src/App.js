import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import LoginPage from "./Views/LoginPage";
import ProfilePage from "./Views/ProfilePage";
import CalendarView from "./Views/CalendarPage";
import CreateUserPage from "./Views/CreateUserPage";
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
        <Route path="createUser" element={<CreateUserPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
