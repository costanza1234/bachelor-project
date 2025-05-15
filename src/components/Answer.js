// src/components/Answer.js
import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@mantine/core';
import { IslandContext } from '../utils/IslandContext';
import { useNavigate, useParams } from 'react-router-dom';
import gameState from '../utils/gameState';
import { saveGameState } from '../utils/helpers';


export default function Answer() {
    const [ text, setText ] = useState("");
    const navigate = useNavigate();
    const { completed, completeIsland } = useContext(IslandContext);

    // this param is the index in the shuffled array
    const { questionId } = useParams();
    const idx = parseInt(questionId, 10);

    function handleSubmit() {
        if (!text) return;

        const submitTime = new Date().toISOString();

        const island = gameState.islands.find(island => island.islandID === Number(questionId));

        // record the submit time
        island.islandData.submitTime = submitTime;
        saveGameState();
        // record the answer
        island.islandData.userAnswer = text;
        completeIsland(idx);
        // increment the score
        gameState.incrementScore(10);
        saveGameState();

        // log to check the gameState update
        console.log("gameState updated:", gameState);

        navigate("/MapPage");
    }

    useEffect(() => {
        if (completed.length === 6) {

            gameState.finishTime = new Date().toISOString();
            saveGameState();

            gameState.sessionLength = (new Date(gameState.finishTime) - new Date(gameState.startTime)) / 1000;
            saveGameState();

            navigate("/FinishPage");
        }
    }, [ completed, navigate ]);


    return (
        <div className="answer-wrapper">
            <label htmlFor="answer-textarea"><h3>Risposta:</h3></label>
            <textarea
                id="answer-textarea"
                className="text-area"
                placeholder="Scrivi qui la risposta alla domanda..."
                value={text}
                onChange={e => setText(e.target.value)}
                rows={4}
            />
            <Button
                onClick={handleSubmit}
                radius="lg"
                variant="filled"
                color="rgb(71, 159, 203)"
            >
                Invia
            </Button>
        </div>
    );
}
