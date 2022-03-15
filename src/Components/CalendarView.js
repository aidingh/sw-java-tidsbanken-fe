import {React, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

/**
 *  @return {Component} The CalendarView component
 */
const CalendarView = () => {
  useEffect(async () => {
    const data = await fetch('http://localhost:80/vacation');
    const jsonData = await data.json();

    console.log(jsonData);
  });

  const eventData = [
    {
      title: 'heeeej',
      start: '2022-03-02',
    },
    {
      title: 'heeeej',
      start: '2022-03-05',
    },
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={eventData}
    />
  );
};

export default CalendarView;
