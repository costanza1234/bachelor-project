import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages';

export default function GameFinish() {

    const { gameState } = useGameState();
    const score = gameState.score;
    const { gameLanguage } = gameState;
    const gameText = languages[ gameLanguage ];


    return (
        <div className="landingFinish">
            {/* Add a a party winning icon  */}
            <img
                src="/finish.gif"
                alt="party"
                className="partyIcon"
            />
            <p className="welcomeMessage">
                {gameText.FinishMessage}
                <br />
                <span className="score">{score}</span>
            </p>
        </div>
    );
}
