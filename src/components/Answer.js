// src/components/Answer.js
import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import { IslandContext } from '../utils/IslandContext';
import { useNavigate } from 'react-router-dom';

export default function Answer({ value, onChange }) {
    const navigate = useNavigate();
    const { setActiveIdx } = useContext(IslandContext);

    const handleSubmit = () => {
        console.log("Answer submitted:", value);
        // **unlock next island**
        setActiveIdx(idx => idx + 1);
        // redirect to /MapPage
        navigate("/MapPage");
    };

    return (
        <div className="answer-wrapper">
            <label htmlFor="answer-textarea"><h3>Risposta:</h3></label>
            <textarea
                id="answer-textarea"
                className="text-area"
                placeholder="Scrivi qui la risposta alla domanda..."
                value={value}
                onChange={onChange}
                rows={4}
            />
            <Button
                className="answer-submit-button"
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
