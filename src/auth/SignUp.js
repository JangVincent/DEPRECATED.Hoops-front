import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../commons/Modal";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [modalOn, setModalOn] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");

  const trySignUp = () => {
    const emailReg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailReg.test(email)) {
      setModalHeader("Error Occured!");
      setModalBody("Please Check your email");
      setModalOn(true);
      return;
    }

    const passcodeReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/gi;
    if (!passcodeReg.test(passcode)) {
      setModalHeader("Error Occured!");
      setModalBody(
        "Passcode contain at least 1 of character, number, special character. Also over 8 character."
      );
      setModalOn(true);
      return;
    }

    if (verificationCode.length < 0) {
      setModalHeader("Error Occured!");
      setModalBody("Please Check Verification Code.");
      setModalOn(true);
      return;
    }

    //axios.post(process.env.REACT_APP_API_SERVER_DOMAIN + "/auth/signup");
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden bg-zinc-900 mx-6 rounded mt-10 pb-20 pt-20">
      <div className="w-full p-6 m-auto bg-zinc-900 rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-zinc-200 uppercase">
          Sign Up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-zinc-200"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-zinc-400 focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="email@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-10">
            <label
              for="password"
              className="block text-sm font-semibold text-zinc-200"
            >
              Passcode
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-zinc-400 focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="At least 1 upper case letter and special character."
              onChange={(e) => {
                setPasscode(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-zinc-200"
            >
              Verification Code
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-zinc-400 focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Verification Code here"
              onChange={(e) => {
                setVerificationCode(e.target.value);
              }}
            />
          </div>
          <a href="#" className="text-sm text-zinc-500 hover:text-zinc-200">
            Send Verification Message
          </a>
          <div className="mt-6">
            <div
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-zinc-600 rounded-md hover:bg-zinc-400 hover:text-zinc-900 focus:outline-none focus:bg-zinc-600"
              onClick={() => {
                trySignUp();
              }}
            >
              Confirm
            </div>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t"></div>

        <p className="mt-8 text-xs font-light text-center text-gray-200">
          {" "}
          Do you have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-zinc-600 hover:text-zinc-200"
          >
            Sign In
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
