<<<<<<< HEAD
import {React, useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
=======
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

>>>>>>> development
/**
 *  @return {Component} The CalendarView component
 */
const CalendarView = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(async () => {
    const data = await fetch('http://localhost:80/vacation');
    const jsonData = await data.json();

    const events = [];
    jsonData.forEach((vacationRequest) => {
      if ('APPROVED'.localeCompare(vacationRequest.status) == 0) {
        events.push({
          status: vacationRequest.status,
          title: vacationRequest.title,
          start: vacationRequest.startPeriod,
          end: vacationRequest.endPeriod,
          color: '#00cc00',
          textColor: '#000000',
        });
      }

      if ('DENIED'.localeCompare(vacationRequest.status) == 0) {
        events.push({
          status: vacationRequest.status,
          title: vacationRequest.title,
          start: vacationRequest.startPeriod,
          end: vacationRequest.endPeriod,
          color: '#800000',
          textColor: '#000000',
        });
      }

      if ('PENDING'.localeCompare(vacationRequest.status) == 0) {
        events.push({
          status: vacationRequest.status,
          title: vacationRequest.title,
          start: vacationRequest.startPeriod,
          end: vacationRequest.endPeriod,
          color: '#ffff80',
          textColor: '#000000',
        });
      }
    });


    setEventData(events);

    console.log(events);
  }, []);

  return (
<<<<<<< HEAD
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={eventData}
    >
    </FullCalendar>
=======
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          {
            title: "event 1",
            start: "2022-03-01",
            end: "2022-03-03",
          },
          { title: "event 2", date: "2019-04-02" },
        ]}
      />
    </>
>>>>>>> development
  );
};


export default CalendarView;
