import React, { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";
import { registerUser, loginUser, getBasket } from "../api/Service";
import { useNavigate } from "react-router-dom";
import { getRole } from "../common/helpers";



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

    const [isValidForm, setIsValidForm] = useState(true);

    const isValidRegister = () => {
        let valid = true;
        valid = valid && registerState.firstName.length > 0;
        valid = valid && registerState.lastName.length > 0;
        valid = valid && registerState.email.length > 0;
        valid = valid && registerState.userName.length > 0;
        valid = valid && registerState.password.length > 0;
        valid = valid && registerState.phoneNumber.length > 0;

        setIsValidForm(valid);
        return valid;
    }

    const isValidLogin = () => {
        let valid = true;
        valid = valid && logInState.userName.length > 0;
        valid = valid && logInState.password.length > 0;

        setIsValidForm(valid);
        return valid;
    }

    const isLogged = () => {
        const token = localStorage.getItem("accessToken");
        if (token !== null) {
            navigate('/');
            return true;
        } else {
            return false;
        }
    };

    const navigate = useNavigate();

    const registerInputHandler = (e) => {
        const { name, value } = e.target;

        setRegisterState({ ...registerState, [name]: value });
    };
    const logInInputHandler = (e) => {
        const { name, value } = e.target;

        setLogInState({ ...logInState, [name]: value });
    };

    const [isCorrectPassword, setIsCorrectPassword] = useState(true);
    const [usernameExists, setUsernameExists] = useState(false);
    const [errMessages, setErrMessages] = useState([]);

    

    const loginRegistrationHandler = async () => {

        if (registered) {

            if (isValidLogin()) {
                await loginUser(logInState).then(async (res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    localStorage.setItem("userName", res.data.userName);
                    localStorage.setItem("userEmail", res.data.userEmail);
                    console.log(role + "oduhafougfouagvf");
                    const role = getRole();
                    if (role !== "Administrator") {

                        await getBasket(res.data.userName);

                    }
                    
                    navigate('/');
                }).catch((err) => { setIsCorrectPassword(false) });
            }

        } else {

            if (isValidRegister()) {
                await registerUser(registerState).then(() => { 

                    setRegistered(true);
                    setIsValidForm(true);
                    setErrMessages([]);
                    navigate('/login-register');
                }).catch((err) => {
                    let data = err.response.data;
                    setErrMessages(Object.keys(data).map((key) => {
                        return data[key][0];
                    }))
                });
            }
        }
    };


    return (<>{ 
        <Modal
            isOpen={!isLogged()}
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
                        <div className="inputs-wrap">
                        <div className="input-wrap">
                            <label htmlFor="firstName">* First name  </label>
                            <input
                                placeholder="Enter name"
                                value={registerState.firstName}
                                name="firstName"
                                type="text"
                                onChange={registerInputHandler}
                            />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="lastName">* Last name </label>
                            <input
                                placeholder="Enter last name"
                                value={registerState.lastName}
                                name="lastName"
                                type="text"
                                onChange={registerInputHandler}
                            />
                         </div>
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="userName">* Username </label>
                            <input
                                placeholder="Enter username"
                                value={registerState.userName}
                                name="userName"
                                type="text"
                                onChange={registerInputHandler}
                            />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="email">* Email </label>
                            <input
                                placeholder="Enter email"
                                value={registerState.email}
                                name="email"
                                type="text"
                                onChange={registerInputHandler}
                            />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="password">* Password</label>
                            <input
                                placeholder="Enter password"
                                value={registerState.password}
                                name="password"
                                type="password"
                                onChange={registerInputHandler}
                            />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="phone">* Phone number </label>
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
                            <label htmlFor="userName">* Username</label>
                            <input
                                placeholder="Enter username"
                                value={logInState.userName}
                                name="userName"
                                type="text"
                                onChange={logInInputHandler}
                            />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="password">* Password</label>
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
                {isValidForm ? <></> : <div className="err-msg">All fields are required</div>}
                {isCorrectPassword ? <></> : <div className="err-msg">Incorrect username or password</div>}
                {errMessages.map((msg) => {
                    return <div className="err-msg">{ msg }</div>
                })}
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
                            setErrMessages([]);
                            setIsCorrectPassword(true);
                        }}
                    >
                        here.
                    </span>
                </p>
            </div>
        </Modal>
  }</>);
};

export default LoginRegistrationModal;
