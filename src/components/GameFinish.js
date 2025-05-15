import gameState from "../utils/gameState";

export default function GameFinish() {

    return (
        <div className="landingFinish">
            {/* Add a a party winning icon  */}
            <img
                src="/finish.gif"
                alt="party"
                className="partyIcon"
            />

            <p className="welcomeMessage">
                Grazie per aver giocato! <br />
                Questo è il tuo punteggio finale: <br />
                <span className="score">{gameState.score}</span>
            </p>
        </div>
    );
}
