import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages';

/**
 * GameFinish component displays the final screen of the game, showing a celebratory icon,
 * a finish message in the selected language, and the player's score.
 *
 * Utilizes the `useGameState` custom hook to access the current game state, including
 * the score and selected language. The finish message is localized based on the current language.
 *
 * @component
 * @returns {JSX.Element} The rendered finish screen with a party icon, finish message, and score.
 */
export default function GameFinish() {

    // useGameState is a custom hook that provides access to the game state context
    // gameState is an object that contains the current state of the game
    const { gameState } = useGameState();

    // score is the current score of the game
    // gameLanguage is a property of the gameState that indicates the current language
    const { score, gameLanguage } = gameState;

    // languages is an object that contains strings for different languages
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
