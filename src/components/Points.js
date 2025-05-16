import { useGameState } from '../utils/GameStateContext';


export default function Points() {
    const { gameState } = useGameState();

    const score = gameState.score;

    return (
        <p className="points">
            Punteggio: {score}
        </p>
    );
}