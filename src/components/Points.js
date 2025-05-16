import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages.js';


export default function Points() {

    const { gameState } = useGameState();

    const gameLanguage = gameState.gameLanguage;
    const gameText = languages[ gameLanguage ];

    const score = gameState.score;

    return (
        <p className="points">
            {gameText.Score}{score}
        </p>
    );
}