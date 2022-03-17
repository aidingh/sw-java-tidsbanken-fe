import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import tokenReducer from "./redux-features/tokenState";
import { Auth0Provider } from "@auth0/auth0-react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

const redirect = "http://localhost:3000/home";
const domain = "dev-377qri7m.eu.auth0.com";
const audience = "https://time.bank.com";
const clientId = "5F9MNB2qBN9dR6JxAdwF2zjVKic8ZBwh";

const store = configureStore({
  reducer: {
    token_reducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor = persistStore(store);

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
