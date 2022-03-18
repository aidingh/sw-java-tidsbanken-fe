import React from "react";
import { useDispatch , useSelector} from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import CalendarView from "./CalendarPage";
import LoadingSpinner from "../Elements/LoadingSpinner";
import ApplicationFrame from "../Elements/ApplicationFrame";
import { setToken } from "../Redux-Features/tokenState";
import { useEffect } from "react";
import {useFetch} from "../Service/TimeBankService";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  const { logout, isAuthenticated, getAccessTokenSilently, isLoading, user } = useAuth0();
  const token = useSelector((state) => state.token_reducer.value);

  const [role, setRole] = useState([]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      startReducer(user);
    }
  }, [isAuthenticated]);

  async function startReducer(user) {
    let split = user.sub.split("|");
    await setTokenToStore(split[1]);
  }

  async function setTokenToStore(clientId) {
    let role = await getUserRole(clientId);
    setRole(role);
    dispatch(setToken({ jwt_token: await getToken(), role: role , user: user}));
  }

  async function getUserRole(clientId) {
    let temp = await getToken()
    const bearer = `Bearer ${temp}`;
    let data = await useFetch(`http://localhost:8080/api/v1/user/role/${clientId}`, bearer);
    return data[0].name;
  }

  async function getToken() {
    const token = await getAccessTokenSilently({
      audience: "https://time.bank.com",
    });
    return token;
  }

  function startLogOutAction() {
    let startPagePath = "http://localhost:3000/";
    logout({ startPagePath });
    localStorage.clear();
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    {!isAuthenticated && <Navigate to="/" />}
    {isAuthenticated && (
      <header className="header">
        <ApplicationFrame startLogOutAction={startLogOutAction} />
        <div className="px-8 ...">
          <div className="text-right">
            <h2>{"User:  " + user.nickname}</h2>
            <h2>{"Role:  " + role}</h2>
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

//<h2> {"Please sign in to view page"}</h2>
