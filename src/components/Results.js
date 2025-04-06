import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Results({ isAI, result }) {
    if (!result || (Array.isArray(result) && result.length === 0)) {
        return null;
    }

    if (isAI) {
        return (
            <div className="response">
                <div className="AI-response">
                    <ReactMarkdown>{result || "Come posso aiutarti?"}</ReactMarkdown>
                </div>
            </div>
        );
    }

    return (
        <div className="response">
            {result.map((r, i) => (
                <div className="result-item" key={i}>
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
