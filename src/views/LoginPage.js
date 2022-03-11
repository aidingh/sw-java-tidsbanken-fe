import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {loginWithRedirect, isAuthenticated} = useAuth0();

  function routeChange() {
    let path = `/home`;
    navigate(path);
  }

  const startLoginAction = (event) => {
    event.preventDefault();

    console.log("is auth: " + isAuthenticated);
    loginWithRedirect();
  };

  function startAction(){
    console.log("is auth: " + isAuthenticated);
  }

  /*return (
    <>
      <header className="header">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={startLoginAction} >Login</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={startAction} >test</button>
      </header>
  </>
  );*/

  return (
    <>
    {isAuthenticated && <Navigate to="/" />}
    {!isAuthenticated && (
      <header className="header">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={startLoginAction} >Login</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={startAction} >test</button>
      </header>
    )}
  </>
  );
}
export default LoginPage;

