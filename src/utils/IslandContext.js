import { createContext, useState, useEffect } from 'react';
import gameState from './gameState';
import { saveGameState } from './helpers';

export const IslandContext = createContext({
    completed: [],
    completeIsland: () => { }
});

export function IslandProvider({ children }) {
    const [ completed, setCompleted ] = useState([]);

    function completeIsland(idx) {
        setCompleted(prev =>
            prev.includes(parseInt(idx, 10)) ? prev : [ ...prev, parseInt(idx, 10) ]
        );
    }

    useEffect(() => {
        gameState.islandCompletionOrder = completed;
        saveGameState();

        // log to check the gameState update
        console.log("island completed, gameState updated:", gameState);

    }, [ completed ]);

    return (
        <IslandContext.Provider value={{ completed, completeIsland }}>
            {children}
        </IslandContext.Provider>
    );
}
