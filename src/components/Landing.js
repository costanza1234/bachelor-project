// Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { shuffleIslands } from "../utils/islandState";

export default function Landing() {
    const navigate = useNavigate();

    const handleStart = () => {
        localStorage.removeItem("shuffledIslands");
        shuffleIslands();        // Shuffle only ONCE here
        navigate("/MapPage");
    };

    return (
        <div className='landing'>
            <p className='welcomeMessage'>
                Ciao! <br />
                Aspetta che la maestra ti dica di iniziare prima di cliccare sul bottone 😉
            </p>

            <button className='startButton' onClick={handleStart}>
                INIZIA A GIOCARE
            </button>
        </div>
    );
}
