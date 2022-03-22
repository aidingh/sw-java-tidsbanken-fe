import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import CalendarView from "./CalendarPage";
import LoadingSpinner from "../Elements/LoadingSpinner";
import ApplicationFrame from "../Elements/ApplicationFrame";
import { setToken } from "../Redux-Features/tokenState";
import { useEffect } from "react";
import { useFetch } from "../Service/TimeBankService";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  /**
   * Dispatch object from react-redux.
   * Used to dispatch values into the reducer.
   */
  const dispatch = useDispatch();

  /**
   * Auth0s hook functions and variables.
   */
  const { logout, isAuthenticated, getAccessTokenSilently, isLoading, user } =
  useAuth0();


  /**
   * Selector to get any globally scoped variables from projects redux store.
   */
  const token = useSelector((state) => state.token_reducer.value);

  /**
   * Update a user role
   */
  const [role, setRole] = useState([]);

  /**
   * Function will run on every page render.
   * Function will only dispatch values to the redux reducer if the values are not set.
   *
   * @param {void}
   */
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      startReducer(user);
    }
  }, [isAuthenticated]);

  /**
   * Function will assure that the right client id is passed into the next function.
   *
   * @param {Object} user User object provided by Auth0.
   */
  async function startReducer(user) {
    let split = user.sub.split("|");
    await setStoreValues(split[1]);
  }

  /**
   * Function will first get a role from database then set the role to update its state in the UI.
   * Function will dispatch values to a redux reducer.
   * Jwt, role and user object is set to the projects redux reducer.
   *
   * @param {string} clientId The clients unique ID.
   */
  async function setStoreValues(clientId) {
    setRole(await getUserRole(clientId));
    dispatch(setToken({ jwt_token: await getToken(), role: await getUserRole(clientId), user: user }));
  }

  /**
   * Function will attempt to fetch the user role from the database.
   *
   * @param {string} clientId The clients unique ID.
   * @returns {string} Returns the users role.
   */
  async function getUserRole(clientId) {
    let temp = await getToken();
    const bearer = `Bearer ${temp}`;
    let data = await useFetch(
      `http://localhost:8080/api/v1/user/role/${clientId}`,
      bearer
    );
    return data[0].name;
  }

  /**
   * Function will attempt to fetch the users jwt-token.
   * Function will use Auth0s hook function to fetch the token.
   *
   * @param {void}
   * @returns {string} Returns the users JWT-token.
   */
  async function getToken() {
    const token = await getAccessTokenSilently({
      audience: "https://time.bank.com",
    });
    return token;
  }

  /**
   * Function will sign out the current user and redirect back to LoginPage.
   * Function will use Auth0s hook function (logout) to achieve this.
   *
   * @param {void}
   * @returns {void}
   */
  function startLogOutAction() {
    let startPagePath = "http://localhost:3000/";
    logout({ startPagePath });
    localStorage.clear();
  }

  /**
   * Will display a loading spinner for the client when any fetch is made by Auth0.
   *
   * @param {boolean} isLoading  Hook variable from auth0. Is true while fetches are made by Auth0.
   * @returns {HTMLCollection} LoadingSpinner
   */
  if (isLoading) {
    return <LoadingSpinner />;
  }

  /**
   * When fetches are completed the actual design of the page is rendered.
   * Page will only be visible if a user is authenticated.
   * If not authenticated the user will be redirected to LoginPage.
   *
   * @returns {HTMLCollection}
   */
  return (
    <>
      {!isAuthenticated && <Navigate to="/" />}
      {isAuthenticated && (
        <header className="header">
          <ApplicationFrame startLogOutAction={startLogOutAction} />
          <div className="px-8 ...">
            <div className="text-right">
              <h2>{"User:  " + token.user.nickname}</h2>
              <h2>{"Role:  " + token.role}</h2>
            </div>
          </div>
          <div className="p-8 ...">
            <CalendarView />
          </div>
        </header>
      )}
    </>
  );
};
export default HomePage;
