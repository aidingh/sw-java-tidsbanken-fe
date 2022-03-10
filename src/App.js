import React from 'react';
import ModalComponent from './components/ModalComponent';
// import CalendarView from './views/CalendarView';

/**
 * @return {Component} The app component
 */
function App() {
  return (
    <div className='h-screen w-screen'>
      {/* <CalendarView /> */}
      <ModalComponent />
    </div>
  );
}

export default App;
