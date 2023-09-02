import React, { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";
import { registerUser, loginUser } from "../api/Service";
import { useNavigate } from "react-router-dom";

/*const History() => {
    const history = useHistory();
    history.push('/');
    history.replace('/');
    history.goBack();

};*/


const LoginRegistrationModal = ({ isOpen = true }) => {
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("Already registered? Log in ");
  const [registerState, setRegisterState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    phoneNumber: ""
  });
  const [logInState, setLogInState] = useState({
    userName: "",
    password: ""
  });

  const navigate = useNavigate();

  const registerInputHandler = (e) => {
    const { name, value } = e.target;

      setRegisterState({ ...registerState, [name]: value });
  };
  const logInInputHandler = (e) => {
    const { name, value } = e.target;

      setLogInState({ ...logInState, [name]: value });
  };

  //TODO
    const inputVerification = () => { };

    const loginRegistrationHandler = async () => {
       
        if (registered) {
            console.log(logInState);

            const res = await loginUser(logInState);
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("userName", res.data.userName);
            localStorage.setItem("roleName", res.data.roleName);
            navigate('/');
        } else {
            console.log("QUEEE: "+registerState);
            await registerUser(registerState);
            navigate('/login-register');
        }
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
                value={registerState.firstName}
                name="firstName"
                type="text"
                onChange={registerInputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="lastName">Last name: </label>
              <input
                placeholder="Enter last name"
                value={registerState.lastName}
                name="lastName"
                type="text"
                onChange={registerInputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="userName">Username: </label>
              <input
                placeholder="Enter username"
                value={registerState.userName}
                name="userName"
                type="text"
                onChange={registerInputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="email">Email: </label>
              <input
                placeholder="Enter email"
                value={registerState.email}
                name="email"
                type="text"
                onChange={registerInputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="password">Password: </label>
              <input
                placeholder="Enter password"
                value={registerState.password}
                name="password"
                type="password"
                onChange={registerInputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="phone">Phone number: </label>
              <input
                placeholder="Enter phone number"
                value={registerState.phoneNumber}
                name="phoneNumber"
                type="text"
                onChange={registerInputHandler}
              />
            </div>
          </>
        ) : (
          <>
            <div className="input-wrap">
              <label htmlFor="userName">Username: </label>
              <input
                placeholder="Enter username"
                value={logInState.userName}
                name="userName"
                type="text"
                onChange={logInInputHandler}
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="password">Password: </label>
              <input
                placeholder="Enter password"
                value={logInState.password}
                name="password"
                type="password"
                onChange={logInInputHandler}
              />
            </div>
          </>
        )}
        <button
                  type="submit"
                  className="login-button"
                  onClick={() => { loginRegistrationHandler() }}
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
