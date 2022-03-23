import Modal from '@mui/material/Modal';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Returns modal component
 * @return {Component} ModalComponent
 */
const ModalComponent = ({ handleOpen, open, children }) => {

  return (
    <Modal className="flex h-screen"
      open={open}
      onClose={handleOpen}
    >
      <>
        {children}
      </>
    </Modal>
  );
};

ModalComponent.prototypes = {
  handleOpen: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.children
};


export default ModalComponent;

