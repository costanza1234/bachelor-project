import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (

        <div className='landing'>

            <p className='welcomeMessage'>
                Benvenuto! <br />
                Aspetta che la maestra ti dica di iniziare prima di cliccare sul bottone 😉
            </p>

            <button
                className='startButton'
                onClick={() => navigate("/MapPage")}>INIZIA A GIOCARE</button>
        </div>
    );
}