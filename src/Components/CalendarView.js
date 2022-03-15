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
  );
};

export default CalendarView;
