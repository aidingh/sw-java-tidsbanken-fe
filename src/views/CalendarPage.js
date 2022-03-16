import {React, useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import ModalComponent from '../Componets/ModalComponent'
/**
 *  @return {Component} The CalendarView component
 */
const CalendarView = () => {
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);

   /**
   * Open and closes the modal.
   * @return {Boolean}
   */
    const handleOpen = () => {
      setOpen(!open)
    }


  useEffect(async () => {
    const data = await fetch('http://localhost:8080/vacation');
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
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventData}
        customButtons={{
          vacationRequest:{
            text:'Vacation Request',
            click: () => {
              handleOpen()
            }
          }
        }}
        headerToolbar={{center: 'vacationRequest'}}
      >
      </FullCalendar>
      <ModalComponent handleOpen={handleOpen} open={open} />
    </>
  );
};


export default CalendarView;