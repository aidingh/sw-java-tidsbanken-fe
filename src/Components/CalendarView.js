import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

/**
 *  @return {Component} The CalendarView component
 */
const CalendarView = () => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="100%"
      />
    </>
  );
};

export default CalendarView;
