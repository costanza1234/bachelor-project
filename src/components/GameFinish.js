import { useGameState } from '../utils/GameStateContext';

export default function GameFinish() {

    const { gameState } = useGameState();
    const score = gameState.score;

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
                <span className="score">{score}</span>
            </p>
        </div>
    );
}
