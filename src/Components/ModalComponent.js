import Modal from '@mui/material/Modal';
import React from 'react';
import VacationRequestFormPage from '../Views/VacationRequestFormPage';
import PropTypes from 'prop-types';



/**
 * Returns modal component
 * @return {Component} ModalComponent
 */
const ModalComponent = ({ handleOpen, open }) => {
  const ref = React.createRef();


  return (
    <Modal className="flex h-screen"
      open={open}
      onClose={handleOpen}
    >
      <>
        <VacationRequestFormPage handleOpen={handleOpen} ref={ref} />
      </>
    </Modal>
  );
};

ModalComponent.prototypes = {
  handleOpen: PropTypes.func,
  open: PropTypes.bool
};


export default ModalComponent;

