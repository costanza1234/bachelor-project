import React from 'react';
import { questions } from '../data/questions';
import { useParams } from 'react-router-dom';

const results = [
    {
        title: "WWF - World Wide Fund for Nature",
        link: "https://www.wwf.org",
        snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
    },
    // more results...
];

export default function Results({ question }) {

    const isAI = question.isAI;

    return (
        <div>
            {results.map((r, i) => (
                <div className="result-item" key={i}>
                    <div className="result-title">{r.title}</div>
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="result-link">
                        {r.link}
                    </a>
                    <div className="result-snippet">{r.snippet}</div>
                </div>
            ))}
        </div>
    );


}