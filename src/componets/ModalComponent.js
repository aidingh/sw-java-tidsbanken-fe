import Modal from '@mui/material/Modal';
import React, {useState} from 'react';
import FormInputComponent from './InputComponent';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import {postData} from '../Service/TimeBankService';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Returns modal component
 * @return {Component} ModalComponent
 */
const ModalComponent = ({handleOpen, open}) => {
  const [fromValue, setFrom] = useState([null, null]);
  const [toValue, setTo] = useState([null, null]);
  const [title, setTitle] = useState('');
  const token = useSelector((state) => state.token_reducer.value)
  const bearer = `Bearer ${token.jwt_token}`
  const { user } = useAuth0();


  /**
  * Get the value of title input on change
  * @param {event} event Fires the handleOnChange event.
  */
  function handleOnChange(event) {
    setTitle(event.target.value);
  }


  /**
 * Submits the vacation request
 * @param {event} event Fires the handleSubmit event.
 */
  function handleSubmit(event) {
    event.preventDefault();
    postData('http://localhost:8080/vacation',bearer,
        {
          title: title,
          startPeriod: fromValue,
          endPeriod: toValue,
        }
    );
    setTitle('');
    setFrom([null, null]);
    setTo([null, null]);
    handleOpen();
  }

  return (
    <>
      <Modal className="flex h-screen"
        open={open}
        onClose={handleOpen}
      >
        <form className="w-96 h-96 bg-white m-auto flex flex-col">
          <div className='self-center mt-6'>
            <FormInputComponent isDisabled
              label='Name' type='text' value={user.nickname}/>
          </div>
          <div className='self-center mt-6'>
            <FormInputComponent handleChange={handleOnChange}
              label='Vacation request title' type='text' />
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
      </Modal>
    </>
  );
};


export default ModalComponent;

