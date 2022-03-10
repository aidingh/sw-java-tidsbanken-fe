import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import CalendarView from './Components/CalendarView';

/**
 * @return {Component} The app component
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="calendar" element={<CalendarView />} />
      </Routes>
    </Router>
  );
}

export default App;
