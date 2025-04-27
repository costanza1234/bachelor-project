// src/components/Answer.js
import React, { useState, useContext } from 'react';
import { Button } from '@mantine/core';
import { IslandContext } from '../utils/IslandContext';
import { useNavigate } from 'react-router-dom';
import tracker from '../utils/tracker';

export default function Answer() {
    const [ text, setText ] = useState("");
    const navigate = useNavigate();
    const { setActiveIdx } = useContext(IslandContext);

    const handleSubmit = () => {
        console.log("Answer submitted:", text);

        if (text) {

            setActiveIdx(i => i + 1);
            navigate("/MapPage");
        }
    };

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
