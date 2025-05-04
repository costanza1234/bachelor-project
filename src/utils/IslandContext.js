import React, { createContext, useState, useEffect } from 'react';
import tracker from './tracker';

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
        tracker.islandCompletionOrder = completed;

        // log to check the tracker update
        console.log("island completed, tracker updated:", tracker);

    }, [ completed ]);

    return (
        <IslandContext.Provider value={{ completed, completeIsland }}>
            {children}
        </IslandContext.Provider>
    );
}
