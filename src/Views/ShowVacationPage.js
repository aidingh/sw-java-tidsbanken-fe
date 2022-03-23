import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import FormInputComponent from '../Components/InputComponent';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';


const ShowVacationPage = ({ vacationTitle, vacationStartDate, vacationEndDate, handleSubmit }) => {
    const { user } = useAuth0();
    return (
        <form className="w-96 h-96 bg-white m-auto flex flex-col">
            <div className='self-center mt-6'>
                <FormInputComponent isDisabled
                    label='Name' type='text' value={user.nickname} />
            </div>
            <div className='self-center mt-6'>
                <FormInputComponent isDisabled
                    label='Vacation request title' type='text' value={vacationTitle} />
            </div>
            <div className='self-center my-3'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        readOnly
                        value={vacationStartDate}
                        onChange={() => {
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className='self-center my-3'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        readOnly
                        value={vacationEndDate}
                        onChange={() => {
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className='flex justify-around content-end grow items-center'>
                <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded justify-self-center'
                    onClick={handleSubmit} value="accept">Accept</button>
                <button className='bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-6 rounded justify-self-center'
                    onClick={handleSubmit} value="deny">Deny</button>
                <button className='bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded justify-self-center'
                    onClick={handleSubmit} value="delete">Delete</button>
            </div>
        </form>
    );
};

ShowVacationPage.prototypes = {
    vacationTitle: PropTypes.string,
    vacationStartDate: PropTypes.string,
    vacationEndDate: PropTypes.string,
    handleSubmit: PropTypes.func
};

export default ShowVacationPage;