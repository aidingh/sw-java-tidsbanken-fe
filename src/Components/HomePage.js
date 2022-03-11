import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function HomePage() {
  let navigate = useNavigate();

  const { logout, user, isAuthenticated, getAccessTokenSilently, getAccessTokenWithPopup} = useAuth0();

  function onRouteChange() {
    let path = `/calendar`;
    navigate(path);
  }

  async function getUserData() {
    let data = await TimeBankService.getInstance().getUserData(await getAccessTokenSilently({audience:"https://time.bank.com"}));
    console.log(getAccessTokenSilently({audience:"https://time.bank.com"}));

    console.log(user);
    console.log(data);
    console.log("is auth: " + isAuthenticated);
  }

  function startLogOutAction() {
    let startPagePath = "http://localhost:3000/home";
    logout({ startPagePath });
  }

 /* return (
    <>
    {!isAuthenticated && <Navigate to="/" />}
    {isAuthenticated && (
    <div class="flex justify-center ...">
    <header className="header">
      <h1 class="text-center text-3xl font-bold underline">Home page</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={getUserData}
      >
        get user data
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={startLogOutAction}
      >
        logout
      </button>

    </header>
  </div>
    )}
  </>
  );*/

  return (
    <div class="flex justify-center ...">
      <header className="header">
        <h1 class="text-center text-3xl font-bold underline">Home page</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={getUserData}
        >
          get user data
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={startLogOutAction}
        >
          logout
        </button>

      </header>
    </div>
  );
}
export default HomePage;

