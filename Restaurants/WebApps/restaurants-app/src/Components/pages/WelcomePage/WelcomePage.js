import React from 'react';
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();
    const accToken = localStorage.getItem("accessToken") ? true : false;
    const isLogged = () => {
        const token = localStorage.getItem("accessToken");
        if (token===null) {
            navigate('/login-register');
        }
    };

    return (<>
        {isLogged() && <div>Radiiiiii</div>}
        </>
    );
};


export default WelcomePage;