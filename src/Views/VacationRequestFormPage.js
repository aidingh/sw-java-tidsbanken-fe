import React, { useState, forwardRef } from 'react';
import FormInputComponent from '../Components/InputComponent';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import { postData } from '../Service/TimeBankService';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const VacationRequestFormPage = ({ handleOpen, setEventData, eventData }) => {
    const [fromValue, setFrom] = useState([null, null]);
    const [toValue, setTo] = useState([null, null]);
    const [title, setTitle] = useState('');
    const token = useSelector((state) => state.token_reducer.value);
    const bearer = `Bearer ${token.jwt_token}`;
    const { user } = useAuth0();

    /**
    * Get the value of title input on change
    * @param {event} event Fires the handleOnChange event.
    */
    function handleOnChange(event,) {
        setTitle(event.target.value);
    }

    /**
    * Submits the vacation request
    * @param {event} event Fires the handleSubmit event.
    */
    async function handleSubmit(event) {
        const splitUserId = user.sub.split("|");
        const userId = splitUserId[1];
        event.preventDefault();
        let post = await postData(`http://localhost:8080/api/v1/vacation/${userId}/create`, bearer,
            {
                title: title,
                startPeriod: fromValue,
                endPeriod: toValue,
            }
        );
        let vacationRequest = {
            vacationRequestId: post.id,
            status: post.status,
            title: post.title,
            start: post.startPeriod,
            end: post.endPeriod,
            color: "#F7CB73",
            textColor: "#000000",
        };
        setTitle('');
        setFrom([null, null]);
        setTo([null, null]);
        setEventData([...eventData, vacationRequest]);
        handleOpen();
    }


    return (
        <form className="w-96 h-96 bg-white m-auto flex flex-col">
            <div className='self-center mt-6'>
                <FormInputComponent isDisabled
                    label='Name' type='text' value={user.nickname} />
            </div>
            <div className='self-center mt-6'>
                <FormInputComponent handleChange={handleOnChange}
                    label='Vacation request title' type='text' value={title} />
            </div>
            <div className='self-center my-3'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="From"
                        value={fromValue}
                        onChange={(value) => {
                            setFrom(value);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className='self-center my-3'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="To"
                        value={toValue}
                        onChange={(value) => {
                            setTo(value);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className='grow flex justify-center items-center'>
                <button className='bg-blue-500 hover:bg-blue-700
         text-white font-bold py-2 px-12 rounded justify-self-center'
                    onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    );
};

export default VacationRequestFormPage;