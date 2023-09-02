import React, { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";
import { registerUser } from "../api/Service";

const LoginRegistrationModal = ({ isOpen = true }) => {
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("Already registered? Log in ");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    phoneNumber: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  //TODO
  const inputVerification = () => {};

  //TODO
  const loginRegistrationHandler = async () => {
    const body = {
      ...state,
    };
    console.log(body);
    await registerUser(body);
  };

  return (
    <Modal
      isOpen={isOpen}
      className={`modal`}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-header">
        <h2>{registered ? "Log in" : "Register"}</h2>
      </div>
      <div className="modal-wrap">
        {!registered ? (
          <>
            <div className="input-wrap">
              <label htmlFor="firstName">First name: </label>
              <input
                placeholder="Enter name"
                value={state.firstName}
                name="firstName"
                type="text"
                onChange={inputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="lastName">Last name: </label>
              <input
                placeholder="Enter last name"
                value={state.lastName}
                name="lastName"
                type="text"
                onChange={inputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="userName">Username: </label>
              <input
                placeholder="Enter username"
                value={state.userName}
                name="userName"
                type="text"
                onChange={inputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="email">Email: </label>
              <input
                placeholder="Enter email"
                value={state.email}
                name="email"
                type="text"
                onChange={inputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="password">Password: </label>
              <input
                placeholder="Enter password"
                value={state.password}
                name="password"
                type="password"
                onChange={inputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="phone">Phone number: </label>
              <input
                placeholder="Enter phone number"
                value={state.phoneNumber}
                name="phoneNumber"
                type="text"
                onChange={inputHandler}
              />
            </div>
          </>
        ) : (
          <>
            <div className="input-wrap">
              <label htmlFor="userName">Username: </label>
              <input
                placeholder="Enter username"
                value={state.userName}
                name="Username"
                type="text"
                onChange={inputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="password">Password: </label>
              <input
                placeholder="Enter password"
                value={state.password}
                name="password"
                type="password"
                onChange={inputHandler}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="login-button"
          onClick={loginRegistrationHandler}
        >
          {registered ? "Log in" : "Register"}
        </button>
        <p>
          {message}
          <span
            onClick={() => {
              if (!registered) {
                setRegistered(true);
                setMessage("Don't have an account? Register ");
              } else {
                setRegistered(false);
                setMessage("Already registered? Log in ");
              }
            }}
          >
            here.
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default LoginRegistrationModal;
