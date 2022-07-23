import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../auth/loggedInSlice";

export default function NavBar() {
  const loggedIn = useSelector((state) => state.loggedIn.value);
  const dispatch = useDispatch();

  const [navigation, setNavigation] = useState([
    { name: "Introduction" },
    { name: "Routains" },
    { name: "Atoms" },
  ]);

  const tryLogout = () => {
    dispatch(logout());
  };

  // const classNames = (...classes) => {
  //   return classes.filter(Boolean).join(" ");
  // };

  const pageNameFilter = (name) => {
    let str = name.toLowerCase();

    if (str === "introduction") {
      return "/";
    } else {
      if (loggedIn) {
        return str;
      } else {
        return "/signin";
      }
    }
  };

  return (
    <div className="flex flex-wrap mb-2 sticky">
      <div className="w-full px-6">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-zinc-900 rounded">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <Link
                className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                to="/"
              >
                The HOOPs v1
              </Link>
              <button
                className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
              >
                {/* <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                  <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                  <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span> */}
              </button>
            </div>
            <div
              className="flex lg:flex-grow items-center"
              id="example-navbar-info"
            >
              <ul className="flex flex-col lg:flex-row list-none ml-auto">
                {navigation.map((value, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <Link
                        className="px-3 py-1 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                        to={pageNameFilter(value.name)}
                      >
                        {value.name}
                      </Link>
                    </li>
                  );
                })}

                {loggedIn ? (
                  <li className="nav-item">
                    <Link
                      className="px-3 py-0.5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/setting"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                <li className="nav-item">
                  {loggedIn === false ? (
                    <Link
                      className="px-3 py-0.5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/signin"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <span
                      className="px-3 py-0.5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      onClick={() => tryLogout()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
