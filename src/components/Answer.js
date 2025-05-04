// src/components/Answer.js
import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@mantine/core';
import { IslandContext } from '../utils/IslandContext';
import { useNavigate, useParams } from 'react-router-dom';
import tracker from '../utils/tracker';


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


        const island = tracker.islands.find(island => island.islandID === Number(questionId));

        // record the submit time
        island.islandData.submitTime = submitTime;
        // record the answer
        island.islandData.userAnswer = text;
        completeIsland(idx);
        tracker.incrementScore(10);

        // log to check the tracker update
        console.log("tracker updated:", tracker);

        navigate("/MapPage");
    }

    useEffect(() => {
        if (completed.length === 6) {

            tracker.finishTime = new Date().toISOString();

            tracker.sessionLength = (new Date(tracker.finishTime) - new Date(tracker.startTime)) / 1000;

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
