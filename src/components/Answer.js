// src/components/Answer.js
import React, { useState, useContext } from 'react';
import { Button } from '@mantine/core';
import { IslandContext } from '../utils/IslandContext';
import { useNavigate, useParams } from 'react-router-dom';
import tracker from '../utils/tracker';
export default function Answer() {
    const [ text, setText ] = useState("");
    const navigate = useNavigate();
    const { completeIsland } = useContext(IslandContext);

    // this param is the index in the shuffled array
    const { questionId } = useParams();
    const idx = parseInt(questionId, 10);

    function handleSubmit() {
        if (!text) return;
        console.log('submitting answer:', text);

        completeIsland(idx);

        // if the number of completed islands is 6, navigate to the finish page
        if (tracker.islandCompletion.length === 6) {
            console.log("All islands completed, navigating to finish page");
            navigate("/FinishPage");
            return;
        }

        navigate("/MapPage");
    }

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
