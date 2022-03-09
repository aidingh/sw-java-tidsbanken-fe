import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import userReducer from './features/user.js'

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

const store = configureStore({
  // Add your redux features here.
  reducer: {
  // user: userReducer
  },
});

ReactDOM.render(
    <React.StrictMode>
      <Provider store={(store)}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);


