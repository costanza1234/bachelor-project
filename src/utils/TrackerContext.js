// src/utils/TrackerContext.js
import React, { createContext, useRef, useContext } from 'react';
import tracker from './tracker';

const TrackerContext = createContext(null);

export function TrackerProvider({ children }) {
    // useRef to hold a stable pointer to your singleton
    const trackerRef = useRef(tracker);
    return (
        <TrackerContext.Provider value={trackerRef.current}>
            {children}
        </TrackerContext.Provider>
    );
}

// custom hook for convenience
export function useTracker() {
    return useContext(TrackerContext);
}
