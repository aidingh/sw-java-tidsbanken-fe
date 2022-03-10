import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import userReducer from './redux-features/user.js'
import {Auth0Provider} from '@auth0/auth0-react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

const homeUrl = "http://localhost:3000/home"

const store = configureStore({
  // Add your redux features here.
  reducer: {
  // user: userReducer
  },
});

ReactDOM.render(
    <React.StrictMode>
      
        <Auth0Provider
          domain="dev-377qri7m.eu.auth0.com"
          clientId="5F9MNB2qBN9dR6JxAdwF2zjVKic8ZBwh"
          redirectUri={homeUrl}
          audience="https://time.bank.com"
        >
          <Provider store={(store)}>
          <App />
          </Provider>
        </Auth0Provider>,
      
    </React.StrictMode>,
    document.getElementById('root'),
);


