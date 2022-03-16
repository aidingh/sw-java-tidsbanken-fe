import { React, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import {useSelector} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
/**
 *  @return {Component} The CalendarView component
 */
const CalendarView = () => {

  const [eventData, setEventData] = useState([]);
  const state = useSelector((state) => state.token_reducer.value);

  const {user} = useAuth0();
  let split = user.sub.split("|");

  const userId = split[1];
  const admin = state.role;

  useEffect(async () => {
    const events = [];

    if (admin == "Admin") {
      const vacations = await fetch(
        "http://localhost:8080/api/v1/vacation/all"
      );
      const vacationsJson = await vacations.json();
      vacationsJson.forEach((vacation) => {
        if ("APPROVED".localeCompare(vacation.status) == 0) {
          setSingleVacationRequest("#00cc00", vacation, events);
        }

        if ("DENIED".localeCompare(vacation.status) == 0) {
          setSingleVacationRequest("#800000", vacation, events);
        }

        if ("PENDING".localeCompare(vacation.status) == 0) {
          setSingleVacationRequest("#ffff80", vacation, events);
        }
      });
    } else {
      const approvedVacations = await fetch(
        "http://localhost:8080/api/v1/vacation/approved"
      );
      const approvedVacationsJson = await approvedVacations.json();
      approvedVacationsJson.forEach((vacationRequest) => {
        setSingleVacationRequest("#00cc00", vacationRequest, events);
      });

      const userVacationRequests = await fetch(
        "http://localhost:8080/api/v1/vacation/" + userId
      );
      const userVacationRequestsJson = await userVacationRequests.json();

      userVacationRequestsJson.forEach((vacation) => {
        if ("APPROVED".localeCompare(vacation.status) == 0) {
          setSingleVacationRequest("#00cc00", vacation, events);
        }

        if ("DENIED".localeCompare(vacation.status) == 0) {
          setSingleVacationRequest("#800000", vacation, events);
        }

        if ("PENDING".localeCompare(vacation.status) == 0) {
          setSingleVacationRequest("#ffff80", vacation, events);
        }
      });
    }
    setEventData(events);
  }, []);

  function setSingleVacationRequest(color, vacationRequest, events) {
    events.push({
      status: vacationRequest.status,
      title: vacationRequest.title,
      start: vacationRequest.startPeriod,
      end: vacationRequest.endPeriod,
      color: color,
      textColor: "#000000",
    });
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={eventData}
    ></FullCalendar>
  );
};

export default CalendarView;
