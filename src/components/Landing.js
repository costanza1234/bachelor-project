import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (

        <div className='landing'>

            <p className='welcomeMessage'>
                Benvenuto in Isole della Conoscenza, un gioco educativo per imparare divertendosi!
            </p>

            <button
                className='startButton'
                onClick={() => navigate("/MapPage")}>INIZIA A GIOCARE</button>
        </div>
    );
}