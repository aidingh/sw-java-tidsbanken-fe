import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { TimeBankService } from "../Service/TimeBankService";
import LoadingSpinner from "./Elements/LoadingSpinner";
import tokenReducer from "../redux-features/tokenState";
import { setToken } from "../redux-features/tokenState";

function ProfilePage() {
  const token = useSelector((state) => state.token_reducer);

  let navigate = useNavigate();

  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  function routeChange(path) {
    navigate(path);
  }

  async function getUserData() {
    /*let data = await TimeBankService.getInstance().getUserData(
      await getAccessTokenSilently({ audience: "https://time.bank.com" })
    );*/
    console.log("kullmai " + token.jwt_token.value);

    let data = await TimeBankService.getInstance().getUserData(token);

    /*console.log(getAccessTokenSilently({ audience: "https://time.bank.com" }));
    console.log(user);
    console.log(data);
    console.log("is auth: " + isAuthenticated);*/
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    isAuthenticated && (
      <div class="flex flex-col justify-center">
        <div class="flex flex-wrap justify-center">
          <div class="w-6/12 sm:w-4/12 px-4">
            <img
              src={user.picture}
              alt="..."
              class="shadow-lg rounded max-w-full h-auto align-middle border-none"
            />
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={getUserData}
            >
              Get user data
            </button>
          </div>
        </div>
      </div>
    )
  );
}
export default ProfilePage;
