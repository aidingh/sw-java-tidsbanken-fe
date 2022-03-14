import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  function routeChange() {
    let path = `/home`;
    navigate(path);
  }

  const startLoginAction = (event) => {
    event.preventDefault();
    loginWithRedirect();
  };

  function startAction() {
    console.log("is auth: " + isAuthenticated);
  }

  return (
    <>
      {isAuthenticated && <Navigate to="/home" />}
      {!isAuthenticated && (
        <header className="header">
          <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
              <div>
                <img
                  class="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Welcome to Time Bank
                </h2>
              </div>
              <form class="mt-8 space-y-6" onClick={startLoginAction}>
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px"></div>

                <div class="flex items-center justify-between"></div>

                <div>
                  <button
                    type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
export default LoginPage;
