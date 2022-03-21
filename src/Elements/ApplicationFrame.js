import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ApplicationFrame = ({ startLogOutAction }) => {
  const state = useSelector((state) => state.token_reducer.value);

  return (
    <div className="py-6 ...">
      <nav className="px-2 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-6 ...">
          <div className="flex flex-wrap justify-between items-center mx-auto">
            <a href="#" className="flex items-center">
              <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
                Time Bank
              </span>
            </a>
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <NavLink
                  to="/home"
                  className="block py-2 pr-4 pl-3 text-gray-700 text-lg border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className="block py-2 pr-4 pl-3 text-gray-700 text-lg border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Profile
                </NavLink>
              </li>

              {state.role == "Admin" && (
                <li>
                  <NavLink
                    to="/admin"
                    className="block py-2 pr-4 pl-3 text-gray-700 text-lg border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  onClick={startLogOutAction}
                  to="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 text-lg border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Sign out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ApplicationFrame;
