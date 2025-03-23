import React from 'react';
import { questions } from '../data/questions';
import { useParams } from 'react-router-dom';
import { performSearch, parseResults } from '../utils/helpers';

const parsed_results = [
    {
        title: "WWF - World Wide Fund for Nature",
        url: "https://www.wwf.org",
        snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
    },
    {
        title: "WWF - World Wide Fund for Nature",
        url: "https://www.wwf.org",
        snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
    },
    {
        title: "WWF - World Wide Fund for Nature",
        url: "https://www.wwf.org",
        snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
    },
    {
        title: "WWF - World Wide Fund for Nature",
        url: "https://www.wwf.org",
        snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
    },
    {
        title: "WWF - World Wide Fund for Nature",
        url: "https://www.wwf.org",
        snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
    },
    {
        title: "WWF - World Wide Fund for Nature",
        url: "https://www.wwf.org",
        snippet: "WWF works to help local communities conserve natural resources, support sustainable livelihoods, and protect wildlife."
    },
];

export default function Results({ question }) {

    // const results = performSearch(question.text);
    // const parsed_results = parseResults(results);

    const isAI = question.isAI;

    return (
        <div>
            {parsed_results.map((r, i) => (
                <div className="result-item">
                    <div className="result-header">
                        <img
                            className="result-favicon"
                            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${r.url}`}
                            alt="favicon"
                        />
                        <div className="result-meta">
                            <div className="result-site-name">{r.title}</div>
                            <div className="result-url">{r.url}</div>
                        </div>
                    </div>

                    <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="result-title"
                    >
                        {r.title}
                    </a>

                    <div className="result-snippet">{r.snippet}</div>
                </div>
            ))}
        </div>
    );


}