import React from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import CalendarView from "./CalendarView";
import LoadingSpinner from "../Elements/LoadingSpinner";
import ApplicationFrame from "../Elements/ApplicationFrame";
import { setToken } from "../redux-features/tokenState";
import { useEffect } from "react";
import TimeBankService from "../Service/TimeBankService";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useDispatch();

  const { logout, isAuthenticated, getAccessTokenSilently, isLoading, user } =
    useAuth0();

  const [role, setRole] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
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
    dispatch(setToken({ jwt_token: await getToken(), role: role }));
  }

  async function getUserRole(clientId) {
    let data = await TimeBankService.getInstance().getUserRole(
      await getToken(),
      clientId
    );
    let object = Object.values(data);
    console.log();
    return object[0].name;
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
    isAuthenticated && (
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
    )
  );
};
export default HomePage;
