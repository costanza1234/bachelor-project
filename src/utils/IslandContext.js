// src/utils/IslandContext.js
import { createContext } from 'react';

export const IslandContext = createContext({
    activeIdx: 0,
    setActiveIdx: () => { }
});
