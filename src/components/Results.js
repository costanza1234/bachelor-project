import React from 'react';

export default function Results({ isAI, result }) {

    if (!result || (Array.isArray(result) && result.length === 0)) {
        return null;
    }

    if (isAI) {
        return (
            <div className="response">
                <div className="AI-response">
                    <p>{result || "Come posso aiutarti?"}</p>
                </div>
            </div>
        );
    }

    const parsedResults = result || [];

    return (
        <div className="response">
            {parsedResults.map((r, i) => (
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
