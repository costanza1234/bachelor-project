import React from 'react';
import gameState from '../utils/gameState';

export default function Points() {
    return (
        <p className="points">
            Punteggio: {gameState.score}
        </p>
    );
}