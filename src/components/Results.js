import React from 'react';
import { questions } from '../data/questions';
import { useParams } from 'react-router-dom';
import { performSearch, parseResults, generateResponse } from '../utils/helpers';

export default function Results({ question }) {

    const isAI = question.isAI;

    if (isAI) {

        const AIresponse = generateResponse(question.text);

        return (
            <div className="AI-response">
                <p>
                    {AIresponse}
                </p>
            </div>
        );
    }

    else {

        const results = performSearch(question.text);
        const parsed_results = parseResults(results);
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

}