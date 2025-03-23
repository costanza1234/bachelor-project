import React from 'react';

export default function Answer({ value, onChange, onSubmit }) {
    return (
        <div className="answer-wrapper">
            <label className="answer-label" htmlFor="answer-textarea">
                <h3>Risposta</h3>
            </label>

            <div className="textarea-wrapper">
                <textarea
                    id="answer-textarea"
                    className="text-area"
                    placeholder="Scrivi qui..."
                    value={value}
                    onChange={onChange}
                    rows={4}
                />
            </div>

            <button className="answer-submit-button" onClick={onSubmit}>
                Invia
            </button>
        </div>
    );
}