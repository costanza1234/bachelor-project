import { createContext, useContext, useState, useEffect } from 'react';
import languages from '../data/languages.js';
import { shuffle } from "./helpers";

// Set the default language
const defLanguage = "english";

// Define the default state of the game with various properties and their initial values
const defaultState = {
    gameLanguage: defLanguage, // current selected language
    userCode: null, // user provided code (handled in GameStart component)
    startTime: null, // game start time (handled in GameStart component)
    islandCompletionOrder: [], // order in which islands are completed (handled in IslandContext and Answer component)
    islandClickOrder: [], // records each island click with islandID and islandPositionInMap (handled in Map component)
    totalClicksInSession: 0, // total clicks in a session (handled in App.js)
    timeBeforeFirstClick_seconds: null, // time before the first click (handled in App.js)
    finishTime: null, // game finish time (handled in UserAnswer component)
    sessionLength_seconds: null, // duration of the session (handled in UserAnswer component)
    score: 0, // initial score
    islands: [], // array to hold data for each island
};

// Create a React Context for managing game state globally
const GameStateContext = createContext();

// Extract questions for the default language from the imported languages data
const questions = languages[ defLanguage ].questions;

// Custom hook to access the game state from the context
export const useGameState = () => useContext(GameStateContext);

// React provider component to wrap application parts that need to access the game state
/**
 * Provides a game state context to nested components.
 *
 * This component initializes and manages the game state, including properties such as
 * game language, score, island click orders, start/finish times, and detailed island data.
 *
 * It loads the saved game state from localStorage on mount, and automatically saves
 * any changes to the game state back to localStorage. The provider exposes helper functions
 * to update the state in various ways:
 *
 * - setLanguage(lang): Sets the current game language.
 * - incrementScore(points): Increases the game score by given points.
 * - recordIslandClick(islandID, islandPosition): Records an island click and tracks the click order.
 * - setStartTime(date): Sets the start time of the game.
 * - setFinishTime(date): Sets the finish time of the game.
 * - setSessionLength(length): Sets the duration of the current game session.
 * - completeIsland(idx): Marks an island as completed if not already done.
 * - resetGameState(): Resets the game state back to its default values.
 * - initializeIslands(ids): Initializes island data for each provided island ID.
 * - updateIslandData(islandID, updaterFn): Updates specific island data using a provided updater function.
 * - setSubmitTime(islandID, date): Sets the submission time for a specific island.
 * - addQuery(islandID, queryData): Adds a query performed by the user, storing either AI answers or SERP results.
 * - addChoiceForAnswer(islandID, source): Records the user's chosen answer source for an island.
 * - setUserAnswer(islandID, answer): Stores the user's answer for a specific island.
 * - setOpenTime(islandID, date): Sets the open time when an island is first clicked.
 * - shuffleIslandImages(): Shuffles island images and stores the order in localStorage.
 * - getIslands(): Retrieves the stored shuffled island images from localStorage.
 * - exportData(): Exports a subset of the game data for external use.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components that require access to the game state.
 * @returns {JSX.Element} A context provider wrapping the child components and exposing game state and helper functions.
 */
export function GameStateProvider({ children }) {

    // Setup state with defaultState
    const [ gameState, setGameState ] = useState(defaultState);

    // useEffect to load game state from localStorage when component mounts
    useEffect(() => {

        // Check if there is a saved game state in localStorage
        const saved = localStorage.getItem('gameState');

        // If there is a saved state, parse it and update the game state
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge saved state with parsed date objects if they exist
            setGameState((prev) => ({
                ...prev,
                ...parsed,
                startTime: parsed.startTime ? new Date(parsed.startTime) : null,
                finishTime: parsed.finishTime ? new Date(parsed.finishTime) : null,
            }));
        }
    }, []);

    // useEffect to save the current game state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
        console.log("🔄 gameState updated:", gameState);
    }, [ gameState ]);

    // Helper function to update game state by merging in partial state updates
    const update = (partial) => setGameState((prev) => ({ ...prev, ...partial }));

    // Function to set the game language and update the state
    const setLanguage = (lang) => {
        console.log("Setting game language to:", lang);
        update({ gameLanguage: lang });
    };

    // Function to increment the score by a given number of points
    const incrementScore = (points) => update({ score: gameState.score + points });

    // Function to record a click on an island, updating the click order and total clicks
    const recordIslandClick = (islandID, islandPosition) => {
        update({
            islandClickOrder: [ ...gameState.islandClickOrder, { islandID, islandPosition } ],
            totalClicksInSession: gameState.totalClicksInSession + 1,
        });
    };

    // Function to set the start time of the game
    const setStartTime = (date) => update({ startTime: date });

    // Function to set the finish time of the game
    const setFinishTime = (date) => update({ finishTime: date });

    // Function to set the session length
    const setSessionLength = (length) => update({ sessionLength_seconds: length });

    // Function to mark an island as completed if it hasn't been completed before
    const completeIsland = (idx) => {
        if (!gameState.islandCompletionOrder.includes(idx)) {
            update({
                islandCompletionOrder: [ ...gameState.islandCompletionOrder, idx ],
            });
        }
    };

    // Function to reset the game state back to the default state
    const resetGameState = () => {
        setGameState(defaultState);
    };

    // Function to initialize islands with necessary data based on provided ids
    const initializeIslands = (ids) => {
        const islands = ids.map((islandID) => ({
            islandID,
            islandData: {

                // question is handled in the initializeIslands function called in the GameStart component
                question: questions[ islandID - 1 ].text,

                // sentiment is handled in the initializeIslands function called in the GameStart component
                sentiment: questions[ islandID - 1 ].sentiment,

                // openTime is handled in the Map component in the handleClick function
                openTime: null,

                // submitTime is handled in the Answer component
                submitTime: null,

                // choiceForAnswer is a list of 0 or 1. 
                // If the user selects Google, a 0 is pushed in the array, similarly a 1 is pushed when the user selects Gemini. 
                // The length of the array is equal to the number of choices made by the user, independently of the number of queries/prompts made by the user.
                // The array is used to understand if the user tends to choose AI or Google, this can be cross examined with the Queries arra.
                // choiceForAnswer is handled in the ChoicePage component.
                choiceForAnswer: [],

                //  [{AI: 0 or 1, query: queryText, numberOfQueryTerms: numberOfQueryTerms, Answer: answer}, ...], this means that the length of the array is equal to the number of queries made by the user, the flag AI is 0 if the user used Google and 1 if the user used AI. The numberOfQueryTerms is the number of terms used in the query/prompt. 
                // Answer can either be a string (if the user used AI) or an array of SERP results (if the user used Google).
                // A SERP result is an object with the following structure:
                /* {
                    title: String,
                    snippet: String,
                    position: Number,
                    clicked: Boolean,
                    clickOrder: Number,
                    timeSpentOnPage_seconds: Number in milliseconds,
                }  */

                // This is handled in the QuestionPage component.
                Queries: [],

                userAnswer: null,
            },
        }));
        update({ islands });
    };

    // Function to update specific island data using an updater function
    const updateIslandData = (islandID, updaterFn) => {
        setGameState((prev) => {
            const islands = prev.islands.map((island) => {
                if (island.islandID !== islandID) return island;
                return {
                    ...island,
                    islandData: updaterFn(island.islandData),
                };
            });
            return { ...prev, islands };
        });
    };

    // Function to set the submit time for a specific island
    const setSubmitTime = (islandID, date) => {

        // Find the island that matches the given islandID
        const island = gameState.islands.find((island) => island.islandID === islandID);

        // If found, update its submit time
        if (island) {
            updateIslandData(islandID, (data) => ({
                ...data,
                submitTime: date,
            }));
        } else {
            console.error('Island not found:', islandID);
        }
    };

    // Function to add a query performed by the user, if it's an AI query, it will store the AI's answer, otherwise it will store the SERP results
    // Example usage: 
    /* addQuery(3, {
        AI: 1,
        query: "What is photosynthesis?",
        numberOfQueryTerms: 3,
        answer: "Photosynthesis is the process by which green plants..."
        });
    */
    /* 
    addQuery(3, {
    AI: 0,
    query: "photosynthesis meaning",
    numberOfQueryTerms: 2,
    answer: [
        { title: "What is photosynthesis?", snippet: "...", position: 1, clicked: true, clickOrder: 1,  timeSpentOnPage_seconds: 4.5 },
        // ...
        ] 
    });
     */

    const addQuery = (islandID, { AI, query, numberOfQueryTerms, answer }) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            Queries: [ ...data.Queries, { AI, query, numberOfQueryTerms, answer } ],
        }));
    };


    // Function to record the source choice for an answer for a specific island
    const addChoiceForAnswer = (islandID, source) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            choiceForAnswer: [ ...data.choiceForAnswer, source ],
        }));
    };


    // Function to set the user answer for a specific island
    const setUserAnswer = (islandID, answer) => {
        console.log('setting user answer for island:', islandID);
        updateIslandData(islandID, (data) => ({
            ...data,
            userAnswer: answer,
        }));
    };

    // Function to set the open time for a specific island (when clicked)
    const setOpenTime = (islandID, date) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            openTime: date,
        }));
    };

    // Function to shuffle a list of island images and save the shuffled result to localStorage
    const shuffleIslandImages = () => {
        const shuffled = shuffle([
            "island1.png",
            "island2.png",
            "island3.png",
            "island4.png",
            "island5.png",
            "island6.png",
        ]);
        localStorage.setItem("shuffledIslands", JSON.stringify(shuffled));
    };

    // Function to retrieve shuffled islands from localStorage
    const getIslands = () => {
        const stored = localStorage.getItem("shuffledIslands");
        return stored ? JSON.parse(stored) : [];
    };

    // Function to export selected game data for external use
    const exportData = () => {
        return {
            userCode: gameState.userCode,
            startTime: gameState.startTime,
            islandCompletionOrder: gameState.islandCompletionOrder,
            islandClickOrder: gameState.islandClickOrder,
            totalClicksInSession: gameState.totalClicksInSession,
            timeBeforeFirstClick_seconds: gameState.timeBeforeFirstClick_seconds,
            finishTime: gameState.finishTime,
            sessionLength_seconds: gameState.sessionLength_seconds,
            score: gameState.score,
            islands: gameState.islands.map((island) => ({
                islandID: island.islandID,
                islandData: {
                    question: island.islandData.question,
                    sentiment: island.islandData.sentiment,
                    openTime: island.islandData.openTime,
                    submitTime: island.islandData.submitTime,
                    choiceForAnswer: island.islandData.choiceForAnswer,
                    Queries: island.islandData.Queries,
                    userAnswer: island.islandData.userAnswer,
                },
            })),
        };
    };

    // Provide state and helper functions to children components via Context
    return (
        <GameStateContext.Provider
            value={{
                gameState,
                setLanguage,
                update,
                incrementScore,
                recordIslandClick,
                setStartTime,
                setFinishTime,
                setSessionLength,
                resetGameState,
                completeIsland,
                initializeIslands,
                updateIslandData,
                addQuery,
                addChoiceForAnswer,
                setUserAnswer,
                setOpenTime,
                setSubmitTime,
                exportData,
                shuffleIslandImages,
                getIslands,
            }}
        >
            {children} {/* Render nested components */}
        </GameStateContext.Provider>
    );
}
