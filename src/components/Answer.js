import React from 'react';

export default function Answer({ value, onChange }) {
    return (
        <div className="answer-wrapper">
            <label className="answer-label" htmlFor="answer-textarea">Risposta</label>
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
        </div>
    );
}