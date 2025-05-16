import Points from './Points';
import { useLocation } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages';

export default function Header() {

    const location = useLocation();
    const isStartPage = location.pathname === '/';

    const { gameState } = useGameState();
    const gameLanguage = gameState.gameLanguage;
    const gameText = languages[ gameLanguage ];

    return (
        <div>
            <header className="header">
                <h1>{gameText.Header}</h1>
            </header>
            {!isStartPage && <Points />}
        </div>
    );
}