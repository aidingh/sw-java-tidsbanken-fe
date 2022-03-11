import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import CalendarView from './views/CalendarPage';
import ModalComponent from './componets/ModalComponent';

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
