import React from 'react';
import tracker from '../utils/tracker';

export default function Points() {
    return (
        <p className="points">
            Punteggio: {tracker.score}
        </p>
    );
}