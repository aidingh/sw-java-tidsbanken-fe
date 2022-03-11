import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input component
 * @param {handleChange} handleChange - Use to handle changes to input form.
 * @param {label} label - The label of the form.
 * @param {type} type The type of the input field.
 * @return {Component} returns then FormInputComponent
 */
const FormInputComponent = ({handleChange, label, type}) => {
  return (
    <div className='relative'>
      <input type={type} id={label} placeholder={label} className='peer h-10
       w-48 border-b-2 border-gray-300
       text-gray-900 placeholder-transparent
        focus:outline-none focus:border-blue-500'
      onChange={handleChange} />
      <label htmlFor={label} className='absolute left-0 -top-3.5
       text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
        peer-focus:-top-3.5 peer-focus:text-blue-500
        peer-focus:text-sm'>{label}</label>
    </div>
  );
};


FormInputComponent.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default FormInputComponent;
