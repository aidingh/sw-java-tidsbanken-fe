import { React, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ModalComponent from '../Components/ModalComponent';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useFetch } from '../Service/TimeBankService';


/**
 *  @return {Component} The CalendarView component
 */
const CalendarView = () => {
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state.token_reducer.value);
  const bearer = `Bearer ${state.jwt_token}`;


  const { user } = useAuth0();
  let split = user.sub.split("|");

  const userId = split[1];
  const admin = state.role;


  /**
* Open and closes the modal.
* @return {Boolean}
*/
  const handleOpen = () => {
    setOpen(!open);
  };


  useEffect(async () => {
    const events = [];
    if (admin == "Admin") {
      let vacationsJson = await useFetch("http://localhost:8080/api/v1/vacation/all", bearer);
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
    }
    else {
      const approvedVacationsJson = await useFetch("http://localhost:8080/api/v1/vacation/approved", bearer);
      approvedVacationsJson.forEach((vacationRequest) => {
        setSingleVacationRequest("#00cc00", vacationRequest, events);
      });

      const userVacationRequestsJson = await useFetch(`http://localhost:8080/api/v1/vacation/${userId}`, bearer);
      try {
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
      } catch (error) {
        console.error(error);
      }

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
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventData}
        customButtons={{
          vacationRequest: {
            text: 'Vacation Request',
            click: () => {
              handleOpen();
            }
          }
        }}
        headerToolbar={{ center: 'vacationRequest' }}
      >
      </FullCalendar>
      <ModalComponent handleOpen={handleOpen} open={open} />

    </>
  );
};

export default CalendarView;
