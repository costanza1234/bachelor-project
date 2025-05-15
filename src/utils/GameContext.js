// src/utils/GameContext.js
import React, { createContext, useRef, useContext } from 'react';
import gameState from './gameState';

const GameContext = createContext(null);

export function GameProvider({ children }) {
    // useRef to hold a stable pointer to your singleton
    const gameStateRef = useRef(gameState);
    return (
        <GameContext.Provider value={gameStateRef.current}>
            {children}
        </GameContext.Provider>
    );
}

// custom hook for convenience
export function useGame() {
    return useContext(GameContext);
}
