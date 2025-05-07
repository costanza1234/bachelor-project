import React from 'react';
import ReactMarkdown from 'react-markdown';
import tracker from '../utils/tracker';
export default function Results({ isAI, result, questionId }) {

    if (!result || (Array.isArray(result) && result.length === 0)) {
        return null;
    }

    const handleClick = (index) => {

        const island = tracker.islands.find(island => island.islandID === Number(questionId));

        const serpAnswer = island?.islandData?.SERPAnswers?.[ index ];

        if (serpAnswer && !serpAnswer.clicked) {
            console.log('Clicked on SERP answer:', serpAnswer);
            serpAnswer.clicked = true;
            serpAnswer.clickOrder = island.islandData.SERPAnswers.filter(ans => ans.clicked).length;

            // Save timestamp when link is clicked
            const clickTime = Date.now();

            // Optional: you could use visibility change or polling for robustness
            const unloadListener = () => {
                const timeSpent = Date.now() - clickTime;
                serpAnswer.timeSpentOnPage = timeSpent;
                window.removeEventListener('beforeunload', unloadListener);
                document.removeEventListener('visibilitychange', visibilityHandler);
            };

            const visibilityHandler = () => {
                if (document.visibilityState === 'hidden') {
                    unloadListener();
                }
            };

            // Fallback for when tab is closed or navigated away
            window.addEventListener('beforeunload', unloadListener);
            document.addEventListener('visibilitychange', visibilityHandler);

            console.log('finished handleClick');
        }
    };


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
                            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${r.formattedUrl}`}
                            alt="favicon"
                        />
                        <div className="result-meta">
                            <div className="result-site-name">{r.title}</div>
                            <div className="result-url">{r.formattedUrl}</div>
                        </div>
                    </div>

                    <a
                        href={r.formattedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="result-title"
                        onClick={() => handleClick(i)}
                    >
                        {r.title}
                    </a>
                    <div className="result-snippet">{r.snippet}</div>
                </div>
            ))}
        </div>
    );
}
