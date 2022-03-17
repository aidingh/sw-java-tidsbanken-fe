import React from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { TimeBankService } from "../Service/TimeBankService";
import LoadingSpinner from "./Elements/LoadingSpinner";

function ProfilePage() {
  const { isAuthenticated, isLoading, user } = useAuth0();


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    isAuthenticated && (
      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-6/12 sm:w-4/12 px-4">
            <img
              src={user.picture}
              alt="..."
              className="shadow-lg rounded max-w-full h-auto align-middle border-none"
            />
            <h2>{user.nickname}</h2>
            <p>{user.email}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
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
