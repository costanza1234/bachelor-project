import React from 'react';
import { Button } from '@mantine/core';


export default function Answer({ value, onChange }) {

    // Function to handle the submission of the answer

    const onSubmit = () => {
        // Logic to handle the answer submission
        console.log("Answer submitted:", value);
    }

    return (
        <div className="answer-wrapper">
            <label className="answer-label" htmlFor="answer-textarea">
                <h3>Risposta: </h3>
            </label>

            <div className="textarea-wrapper">
                <textarea
                    id="answer-textarea"
                    className="text-area"
                    placeholder="Scrivi qui la risposta alla domanda..."
                    value={value}
                    onChange={onChange}
                    rows={4}
                />
            </div>

            <Button
                className="answer-submit-button"
                onClick={onSubmit}
                radius='lg'
                variant="filled"
                color="rgb(71, 159, 203)"

            >
                Invia
            </Button>
        </div >
    );
}