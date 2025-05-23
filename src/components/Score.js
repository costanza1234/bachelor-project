import { useGameState } from '../utils/GameStateContext.js';
import languages from '../data/languages.js';

/**
 * Score component displays the current score in the selected game language.
 *
 * Uses the game state context to retrieve the current score and language,
 * then displays the localized "Score" label followed by the score value.
 *
 * @component
 * @returns {JSX.Element} A paragraph element showing the localized score.
 */
export default function Score() {

    const { gameState } = useGameState();
    const { gameLanguage, score } = gameState;
    const gameText = languages[ gameLanguage ];

    return (
        <p className="points">
            {gameText.Score}{score}
        </p>
    );
}