import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import CalendarView from "./CalendarPage";
import LoadingSpinner from "../Elements/LoadingSpinner";
import ApplicationFrame from "../Elements/ApplicationFrame";
import { setToken } from "../Redux-Features/tokenState";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();

  const { logout, isAuthenticated, getAccessTokenSilently, isLoading, user } =
    useAuth0();

  const roleState = useSelector((state) => state.token_reducer.value);

  useEffect(() => {
    async function setTokenToStore() {
      let role = await getUserRole();
      dispatch(setToken({ jwt_token: await getToken(), role: role }));
    }
    setTokenToStore();
  }, []);

  async function getUserRole() {
    let split = user.sub.split("|");
    let data = await TimeBankService.getInstance().getUserRole(
      await getToken(),
      split[1]
    );
    const object = Object.values(data);
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
            <h2>{"Role:  " + roleState.role}</h2>
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
