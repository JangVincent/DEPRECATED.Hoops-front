import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../commons/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "./loggedInSlice";

export default function SignIn() {
  const navigation = useNavigate();

  const loggedIn = useSelector((state) => state.loggedIn.value);
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [passcode, setPasscode] = useState("");

  const [modalOn, setModalOn] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");

  const tryLogin = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_SERVER_DOMAIN + "/auth/signin",
        {
          id: id,
          passcode: passcode,
        }
      );

      window.sessionStorage.setItem("hoops-token", res.data.data.token);
      dispatch(login());
      navigation("/");
    } catch (e) {
      console.log(e.response.data);
      setModalHeader("Error Occured!");
      setModalBody(e.response.data.message);
      setModalOn(true);
    }
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden bg-zinc-900 mx-6 rounded mt-10 pb-20 pt-20">
      <div className="w-full p-6 m-auto bg-zinc-900 rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-zinc-200 uppercase">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-zinc-200">
              ID
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-zinc-400 focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="email@example.com"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-zinc-200">
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-zinc-400 focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Your password"
              onChange={(e) => {
                setPasscode(e.target.value);
              }}
            />
          </div>
          <a href="#" className="text-xs text-zinc-500 hover:text-zinc-200">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-zinc-600 rounded-md hover:bg-zinc-400 hover:text-zinc-900 focus:outline-none focus:bg-zinc-600"
              onClick={(e) => {
                e.preventDefault();
                tryLogin();
              }}
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t"></div>

        <p className="mt-8 text-xs font-light text-center text-gray-200">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-zinc-600 hover:text-zinc-200"
          >
            Sign up
          </Link>
        </p>
      </div>
      <Modal
        isOpen={modalOn}
        header={modalHeader}
        body={modalBody}
        close={() => {
          setModalOn(false);
        }}
      />
    </div>
  );
}
