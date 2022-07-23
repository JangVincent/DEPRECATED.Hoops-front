import "./App.css";
import React from "react";

/* Components */
import Navbar from "./nav/NavBar";

import Introduction from "./main/Introduction";
import Routains from "./main/Routains";
import Atoms from "./main/Atoms";

import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

/* Libraries */
import { Routes, Route, Link } from "react-router-dom";
import StatusBar from "./nav/StatusBar";
import { useSelector } from "react-redux";

export default function App() {
  const loggedIn = useSelector((state) => state.loggedIn.value);
  return (
    <div className="App">
      <Navbar />
      {loggedIn ? <StatusBar /> : ""}
      <Routes>
        <Route path="/" element={<Introduction />}></Route>
        <Route path="/routains" element={<Routains />}></Route>
        <Route path="/atoms" element={<Atoms />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}
