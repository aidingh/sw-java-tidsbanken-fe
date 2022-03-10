import Modal from '@mui/material/Modal';
import React, {useState} from 'react';
import FormInputComponent from './FormInputComponent';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
/**
 * Returns modal component
 * @return {Component}
 */
const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  const [fromValue, setFrom] = useState([null, null]);
  const [toValue, setTo] = useState([null, null]);
  const [title, setTitle] = useState('');
  /**
   * Sets open modal
   * @return {null}
   */
  const handleOpen = () => setOpen(true);
  /**
   * sets close modal
   * @return {null}
   */
  const handleClose = () => setOpen(false);
  /**
  * get title value on change
  * @param {*} event event
  */
  function handleOnChange(event) {
    setTitle(event.target.value);
    console.log(title);
  }

  /**
 * submit form event
 * @param {*} event event
 */
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <button onClick={handleOpen}>add requeston vacation</button>
      <Modal className="flex h-screen"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><form className="border-4 border-indigo-600 w-96 h-96 bg-white m-auto">
          <FormInputComponent handleChange={handleOnChange} label='title' />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From"
              value={fromValue}
              onChange={(newValue) => {
                setFrom(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="To"
              value={toValue}
              onChange={(newValue) => {
                setTo(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </Modal>
    </>
  );
};


export default ModalComponent;

