import React from "react";
import { NavLink } from "react-router-dom";

const ApplicationFrame = ({ startLogOutAction }) => {
  return (
    <div class="py-6 ...">
      <nav class="px-2 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="#" class="flex items-center">
            <span class="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
              Time Bank
            </span>
          </a>
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <NavLink
                  to="/profile"
                  className="block py-2 pr-4 pl-3 text-gray-700 text-lg border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/home"
                  className="block py-2 pr-4 pl-3 text-gray-700 text-lg border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  home
                </NavLink>
              </li>
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
      </nav>
    </div>
  );
};

export default ApplicationFrame;
