import Points from './Points';
import { useLocation } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages';

export default function Header() {

    const location = useLocation();
    const isStartPage = location.pathname === '/GameStart';

    const { gameState } = useGameState();
    const gameLanguage = gameState.gameLanguage;
    const gameText = languages[ gameLanguage ];
    // make sure gameText is not undefined
    if (!gameText) {
        console.error('Game text not found for language:', gameLanguage);
        return null; // or some fallback UI
    }

    return (
        <div>
            <header className="header">
                <h1>{gameText.Header}</h1>
            </header>
            {!isStartPage && <Points />}
        </div>
    );
}