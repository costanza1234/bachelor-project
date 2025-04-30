// src/components/Answer.js
import React, { useState, useContext } from 'react';
import { Button } from '@mantine/core';
import { IslandContext } from '../utils/IslandContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function Answer() {
    const [ text, setText ] = useState("");
    const navigate = useNavigate();
    const { completeIsland } = useContext(IslandContext);

    // this param is the index in the shuffled array
    const { questionId } = useParams();
    const idx = parseInt(questionId, 10);

    function handleSubmit() {
        if (!text) return;
        console.log('questionId ', questionId);
        console.log('idx ', idx);

        completeIsland(idx);

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
