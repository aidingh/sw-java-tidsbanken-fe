import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import CalendarView from './components/CalendarView';
import ModalComponent from './components/ModalComponent';

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
        <Route path="modal" element={<ModalComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
