// src/utils/islandState.js
import { shuffle } from "./helpers";

const ISLAND_STORAGE_KEY = "shuffledIslands";

export const shuffleIslands = () => {
    const shuffled = shuffle([
        "island1.png",
        "island2.png",
        "island3.png",
        "island4.png",
        "island5.png",
        "island6.png",
    ]);
    localStorage.setItem(ISLAND_STORAGE_KEY, JSON.stringify(shuffled));

};

export const getIslands = () => {
    const stored = localStorage.getItem(ISLAND_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};
