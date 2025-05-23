import Score from './Score';
import { useLocation } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages';

/**
 * Header component that displays the game header and score.
 *
 * - Shows a language-specific header text based on the current game language.
 * - Hides the Score component on the game start page (`/GameStart`).
 *
 * @returns {JSX.Element} The rendered header and, conditionally, the Score component.
 */
export default function Header() {

    // Get current route location
    const location = useLocation();

    // Check if current page is the game start page
    const isStartPage = location.pathname === '/GameStart';


    // Get game state and language
    const { gameState } = useGameState();
    const { gameLanguage } = gameState;

    // Get language-specific text
    const gameText = languages[ gameLanguage ];

    return (
        <div>
            <header className="header">
                {/* Display the header text for the current language */}
                <h1>{gameText.Header}</h1>
            </header>
            {/* Show Score component unless on the start page */}
            {!isStartPage && <Score />}
        </div>
    );
}