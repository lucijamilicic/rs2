import React, { useState } from "react";
import Modal from "react-modal";
import "./LoginRegistrationModal.css";

const LoginRegistrationModal = ({ isOpen = true }) => {
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("Already registered? Log in ");
  const [state, setState] = useState({
    name: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    phone: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  //TODO
  const inputVerification = () => {};

  //TODO
  const loginRegistrationHandler = () => {};

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
              <label htmlFor="name">Name: </label>
              <input
                placeholder="Enter name"
                value={state.name}
                name="name"
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
                name="Username"
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
                value={state.phone}
                name="phone"
                type="number"
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
