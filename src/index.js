import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import tokenReducer from "../src/Redux-Features/tokenState";
import { Auth0Provider } from "@auth0/auth0-react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import storage from "redux-persist/lib/storage";

/**
 * Configuration object for redux-persist.
 */
const persistConfig = {
  key: "root",
  storage,
};

/**
 * Instantiate a persist reducer.
 * 
 * @param {Object} persistConfig Configuration object.
 * @param {Object} tokenReducer Implemented reducer.
 * 
 **/
const persistedReducer = persistReducer(persistConfig, tokenReducer);

/**
 * Auth0 config parameters.
 */
const redirect = "https://time-bank-app-fe.herokuapp.com/home";
const domain = "dev-377qri7m.eu.auth0.com";
const audience = "https://time.bank.com";
const clientId = "5F9MNB2qBN9dR6JxAdwF2zjVKic8ZBwh";

/**
 * Define a redux-store-object.
 * Object will set a persisted reducer. As the redux values needs to persist on page refresh.
 * 
 * @param {Object} persistedReducer 
 * @param {Object} getDefaultMiddleware 
 */
const store = configureStore({
  reducer: {
    token_reducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/**
 * Function will persist the given store as parameter.
 * 
 * @param {Object} store Applications redux store.
 */
let persistor = persistStore(store);

/**
 * This check is to clear the persisted state from the storage completely.
 * Without it the values in the state will be cleared but not the object itself.
 * This solution works fine for the moment as local storage should be cleared when getting redirected to the LoginPage.
 */
if(window.location.href == 'https://time-bank-app-fe.herokuapp.com/'){
  persistor.purge(store);
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirect}
      audience={audience}
    >
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
