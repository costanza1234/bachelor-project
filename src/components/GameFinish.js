import React from "react";
import tracker from "../utils/tracker";

export default function GameStart() {

    return (
        <div className="landing">
            {/* Add a a party winning icon  */}
            <img
                src="/finish.gif"
                alt="party"
                className="partyIcon"
            />

            <p className="welcomeMessage">
                Grazie per aver giocato! <br />
                Questo è il tuo punteggio finale: <br />
                <span className="score">{tracker.score}</span>
            </p>
        </div>
    );
}
