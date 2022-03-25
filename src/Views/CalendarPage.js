import { React, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ModalComponent from '../Components/ModalComponent';
import VacationRequestFormPage from "./VacationRequestFormPage";
import ShowVacationPage from "./ShowVacationPage";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useFetch, patchData, deleteData } from '../Service/TimeBankService';

/**
 *  @return {Component} The CalendarView component
 */
const CalendarView = () => {
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);
  const [vacationTitle, setVacationTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [vacationRequestId, setVacationRequestId] = useState('');
  const state = useSelector((state) => state.token_reducer.value);
  const bearer = `Bearer ${state.jwt_token}`;

  const pendingColor = "#F7CB73";
  const deniedColor = "#f87171";
  const approvedColor = "#22c55e";

  const { user } = useAuth0();
  let split = user.sub.split("|");

  const userId = split[1];
  const role = state.role;

  /**
   * Open and closes the modal.
   * @return {Boolean}
   */
  const handleOpen = () => {
    setOpen(!open);
  };

  /**
   * Handle Submit based on button value
   * @param {click} event The click event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.value === "accept") {
      changeStatusOfVacationRequest("APPROVED", approvedColor);
    }
    if (event.target.value === "deny") {
      changeStatusOfVacationRequest("DENIED", deniedColor);
      handleOpen();
    }
    if (event.target.value === "delete") {
      deleteVacationRequest();
      handleOpen();
    }
  };

  /**
   * Deletes a vacation request and re-render the calendar.
   */
  const deleteVacationRequest = () => {
    let events = [];
    events = [...eventData];
    deleteData(`https://time-bank-api-be.herokuapp.com/api/v1/vacation/${vacationRequestId}`, bearer);
    events.splice(events.findIndex(event => event.vacationRequestId === vacationRequestId), 1);
    setEventData(events);
  };

  /**
   * Changes the status of the vacation request and re-renders
   * @param {String} status "PENDING", "APPROVED" or "DENIED"
   * @param {String} color "APPROVED - #22c55e" or "DENIED - #f87171" 
   */
  const changeStatusOfVacationRequest = async (status, color) => {
    const body = {
      status: status
    };
    let events = [];
    const patch = await patchData(`https://time-bank-api-be.herokuapp.com/api/v1/vacation/${vacationRequestId}`, bearer, body);
    for (const event of eventData) {
      if (event.vacationRequestId === patch.id) {
        event.status = status;
        event.color = color;
        events = [...eventData];
      }
      setEventData(events);
    }
    handleOpen();
  };

  useEffect(async () => {
    if (state.jwt_token != "") {
      setVacationRequests();
    }
  }, [state]);

  async function setVacationRequests() {
    const events = [];
    if (role == "Admin") {
      let vacationsJson = await useFetch(
        "https://time-bank-api-be.herokuapp.com/api/v1/vacation/all",
        bearer
      );
      vacationsJson.forEach((vacation) => {
        checkStatus(vacation, events);
      });
    } else {
      const approvedVacationsJson = await useFetch(
        "https://time-bank-api-be.herokuapp.com/api/v1/vacation/approved",
        bearer
      );
      if(approvedVacationsJson.status != 500){
        approvedVacationsJson.forEach((vacationRequest) => {
          let splitUserModel = vacationRequest.userModel.split("/");
          if (splitUserModel[4] === userId) {
            return;
          } else {
            setSingleVacationRequest(approvedColor, vacationRequest, events);
          }
        });
      }


      const userVacationRequestsJson = await useFetch(
        `https://time-bank-api-be.herokuapp.com/api/v1/vacation/${userId}`,
        bearer
      );
      try {
        userVacationRequestsJson.forEach((vacation) => {
          checkStatus(vacation, events);
        });
      } catch (error) {
        console.error(error);
      }
    }
    setEventData(events);
  }

  function checkStatus(vacation, events) {
    if ("APPROVED".localeCompare(vacation.status) == 0) {
      setSingleVacationRequest(approvedColor, vacation, events);
    }

    if ("DENIED".localeCompare(vacation.status) == 0) {
      setSingleVacationRequest(deniedColor, vacation, events);
    }

    if ("PENDING".localeCompare(vacation.status) == 0) {
      setSingleVacationRequest(pendingColor, vacation, events);
    }
  }

  function setSingleVacationRequest(color, vacationRequest, events) {
    events.push({
      vacationRequestId: vacationRequest.id,
      status: vacationRequest.status,
      title: vacationRequest.title,
      start: vacationRequest.startPeriod,
      end: vacationRequest.endPeriod,
      color: color,
      textColor: "#000000",
    });
  }

  /**
   * Displays different calendar based on if you are a admin or not.
   * @return {Component} FullCalendar Component
   */
  const displayFullCalender = () => {
    if (role === "Admin") {
      return <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventData}
        eventClick={
          (arg) => {

            const title = arg.event.title;
            let name  = title.split(" ");
            name  = name[0] + " " + name[1];
            const startDate = arg.event.start;
            const endDate = arg.event.end;
            const vacationRequestId = arg.event.extendedProps.vacationRequestId;
            setVacationTitle(title);
            setName(name);
            setStartDate(startDate);
            setEndDate(endDate);
            setVacationRequestId(vacationRequestId);
            handleOpen();
          }
        }
      >
      </FullCalendar>;
    } else {
      return <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventData}
        customButtons={{
          vacationRequest: {
            text: "Vacation Request",
            click: () => {
              handleOpen();
            },
          },
        }}
        headerToolbar={{ center: 'vacationRequest' }}
      >
      </FullCalendar>;
    }
  };


  return (
    <>
      {
        displayFullCalender()
      }
      <ModalComponent handleOpen={handleOpen} open={open}>
        {
          role === "Admin" ? <ShowVacationPage name={name} vacationTitle={vacationTitle} vacationStartDate={startDate} vacationEndDate={endDate} handleSubmit={handleSubmit} /> : <VacationRequestFormPage handleOpen={handleOpen} setEventData={setEventData} eventData={eventData} />
        }
      </ModalComponent>
    </>
  );
};

export default CalendarView;
