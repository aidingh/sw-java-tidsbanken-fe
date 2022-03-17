import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../Assets/time-bank-logo.png";

function LoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const startLoginAction = (event) => {
    event.preventDefault();
    loginWithRedirect();
  };

  return (
    <>
      {isAuthenticated && <Navigate to="/home" />}
      {!isAuthenticated && (
        <header className="header">
          <div className="flex h-screen justify-center items-center">
            <div className="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                  <div>
                    <img
                      className="mx-auto h-22 w-auto"
                      src={logo}
                      alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                      Welcome to Time Bank
                    </h2>
                  </div>
                  <form className="mt-8 space-y-6" onClick={startLoginAction}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px"></div>

                    <div className="flex items-center justify-between"></div>

                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-cyan-500 hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg
                            className="h-5 w-5 text-black-500 group-hover:text-black-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
export default LoginPage;
