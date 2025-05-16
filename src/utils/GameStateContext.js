import { createContext, useContext, useState, useEffect } from 'react';
import languages from '../data/languages.js';
import { shuffle } from "./helpers";

const defLanguage = "english"; // Default language

const defaultState = {
    gameLanguage: defLanguage,
    // userCode is handled in the GameStart component
    userCode: null,
    // startTime is handled in the GameStart component
    startTime: null,
    // islandCompletionOrder is handled in the IslandContext and Answer component
    islandCompletionOrder: [],
    // island order of click {islandID, islandPositionInMap} is handled in the Map component
    islandClickOrder: [],
    // totalClicksInSession is handled in App.js
    totalClicksInSession: 0,
    // timeBeforeFirstClickSeconds is handled in App.js
    timeBeforeFirstClickSeconds: null,
    // finishTime is handled in the Answer component
    finishTime: null,
    // sessionLength is handled in the Answer component
    sessionLength: null,
    // score is handled in the Answer component
    score: 0,
    islands: [],
};

const GameStateContext = createContext();

const questions = languages[ defLanguage ].questions;

export const useGameState = () => useContext(GameStateContext);

export function GameStateProvider({ children }) {

    const [ gameState, setGameState ] = useState(defaultState);

    // Load from localStorage on init
    useEffect(() => {
        const saved = localStorage.getItem('gameState');
        if (saved) {
            const parsed = JSON.parse(saved);
            setGameState((prev) => ({
                ...prev,
                ...parsed,
                startTime: parsed.startTime ? new Date(parsed.startTime) : null,
                finishTime: parsed.finishTime ? new Date(parsed.finishTime) : null,
            }));
        }
    }, []);

    // Auto-save on every change
    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
        console.log("🔄 gameState updated:", gameState);
    }, [ gameState ]);

    // General helpers
    const update = (partial) => setGameState((prev) => ({ ...prev, ...partial }));

    const setLanguage = (lang) => update({ gameLanguage: lang });

    const incrementScore = (points) => update({ score: gameState.score + points });

    const recordIslandClick = (islandID, islandPosition) => {
        update({
            islandClickOrder: [ ...gameState.islandClickOrder, { islandID, islandPosition } ],
            totalClicksInSession: gameState.totalClicksInSession + 1,
        });
    };

    const setStartTime = (date) => update({ startTime: date });

    const setFinishTime = (date) => update({ finishTime: date });

    const setSessionLength = (length) => update({ sessionLength: length });

    const completeIsland = (idx) => {
        if (!gameState.islandCompletionOrder.includes(idx)) {
            update({
                islandCompletionOrder: [ ...gameState.islandCompletionOrder, idx ],
            });
        }
    };

    // Reset game state
    const resetGameState = () => {
        setGameState(defaultState);
    };


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
                // If the user performs a search using Google, a 0 is pushed in the array, similarly a 1 is pushed when the user prompts AI. 
                // The length of the array is equal to the number of queries / prompts made by the user.
                // The array is used to understand if the user has used AI or Google to or both and how many times they performes the switch in order to answer the given question.
                choiceForAnswer: [],

                //  [{AI: 0 or 1, numberOfQueryTerms: numberOfQueryTerms}, ...], this means that the length of the array is equal to the number of queries made by the user, the flag AI is 0 if the user used Google and 1 if the user used AI. The numberOfQueryTerms is the number of terms used in the query/prompt. This is handled in the QuestionPage component.
                numberOfQueryTermsPerQuery: [],

                // AIAnswers is a list of answers given by the AI. The length of the array is equal to the number of prompts made by the user. This is handled in the QuestionPage component.
                AIAnswers: [],

                // SERPAnswers is a list of answers given by Google. The length of the array is equal to the number of queries made by the user times 30, as for every query, we return 30 responses. This is handled in the QuestionPage component.
                // an entry has the following structure:
                /* {
                    title: String,
                    snippet: String,
                    position: Number,
                    clicked: Boolean,
                    clickOrder: Number,
                    timeSpentOnPage: Number milliseconds,
                }  */
                SERPAnswers: [],
                userAnswer: null,
            },
        }));
        update({ islands });
    };

    // Island-specific update helper
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


    const setSubmitTime = (islandID, date) => {
        console.log('setting submit time for island:', islandID);
        // get the islandData for the islandID
        const island = gameState.islands.find((island) => island.islandID === islandID);
        // if the island is found, set the submit time
        if (island) {
            updateIslandData(islandID, (data) => ({
                ...data,
                submitTime: date,
            }));
        } else {
            console.error('Island not found:', islandID);
        }
    };

    const addAIAnswer = (islandID, answer) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            AIAnswers: [ ...data.AIAnswers, answer ],
        }));
    };

    const addQueryMeta = (islandID, meta) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            numberOfQueryTermsPerQuery: [ ...data.numberOfQueryTermsPerQuery, meta ],
        }));
    };

    const addChoiceForAnswer = (islandID, source) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            choiceForAnswer: [ ...data.choiceForAnswer, source ],
        }));
    };

    const addSERPAnswers = (islandID, answers) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            SERPAnswers: [ ...data.SERPAnswers, ...answers ],
        }));
    };

    const setUserAnswer = (islandID, answer) => {
        console.log('setting user answer for island:', islandID);
        updateIslandData(islandID, (data) => ({
            ...data,
            userAnswer: answer,
        }));
    };

    const setOpenTime = (islandID, date) => {
        updateIslandData(islandID, (data) => ({
            ...data,
            openTime: date,
        }));
    };

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

    const getIslands = () => {
        const stored = localStorage.getItem("shuffledIslands");
        return stored ? JSON.parse(stored) : [];
    };

    const exportData = () => {
        return {
            userCode: gameState.userCode,
            startTime: gameState.startTime,
            islandCompletionOrder: gameState.islandCompletionOrder,
            islandClickOrder: gameState.islandClickOrder,
            totalClicksInSession: gameState.totalClicksInSession,
            timeBeforeFirstClickSeconds: gameState.timeBeforeFirstClickSeconds,
            finishTime: gameState.finishTime,
            sessionLength: gameState.sessionLength,
            score: gameState.score,
            islands: gameState.islands.map((island) => ({
                islandID: island.islandID,
                islandData: {
                    question: island.islandData.question,
                    sentiment: island.islandData.sentiment,
                    openTime: island.islandData.openTime,
                    submitTime: island.islandData.submitTime,
                    choiceForAnswer: island.islandData.choiceForAnswer,
                    numberOfQueryTermsPerQuery: island.islandData.numberOfQueryTermsPerQuery,
                    AIAnswers: island.islandData.AIAnswers,
                    SERPAnswers: island.islandData.SERPAnswers.filter((ans) => ans.clicked),
                    userAnswer: island.islandData.userAnswer,
                },
            })),
        };
    };

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
                addAIAnswer,
                addQueryMeta,
                addChoiceForAnswer,
                addSERPAnswers,
                setUserAnswer,
                setOpenTime,
                setSubmitTime,
                exportData,
                shuffleIslandImages,
                getIslands,
            }}
        >
            {children}
        </GameStateContext.Provider>
    );
}
