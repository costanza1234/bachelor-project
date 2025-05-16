import ReactMarkdown from 'react-markdown';
import { useGameState } from '../utils/GameStateContext';

export default function Results({ isAI, result, questionId }) {
    const { gameState, updateIslandData } = useGameState();

    if (!result || (Array.isArray(result) && result.length === 0)) {
        return null;
    }

    const handleClick = (index) => {
        const islandID = Number(questionId);
        const island = gameState.islands.find(island => island.islandID === islandID);
        const serpAnswer = island?.islandData?.SERPAnswers?.[ index ];

        if (serpAnswer && !serpAnswer.clicked) {
            const clickTime = Date.now();

            // Mark answer as clicked and assign clickOrder immediately
            updateIslandData(islandID, (data) => {
                const clickedCount = data.SERPAnswers.filter(a => a.clicked).length;
                const updatedSERPAnswers = data.SERPAnswers.map((ans, i) => {
                    if (i === index) {
                        return {
                            ...ans,
                            clicked: true,
                            clickOrder: clickedCount + 1,
                            timeSpentOnPage: null, // updated on unload
                        };
                    }
                    return ans;
                });
                return { ...data, SERPAnswers: updatedSERPAnswers };
            });

            // Define event listeners to capture time spent
            const unloadListener = () => {
                const timeSpent = Date.now() - clickTime;
                updateIslandData(islandID, (data) => {
                    const updated = [ ...data.SERPAnswers ];
                    const target = updated[ index ];
                    if (target) target.timeSpentOnPage = timeSpent;
                    return { ...data, SERPAnswers: updated };
                });
                window.removeEventListener('beforeunload', unloadListener);
                document.removeEventListener('visibilitychange', visibilityHandler);
            };

            const visibilityHandler = () => {
                if (document.visibilityState === 'hidden') {
                    unloadListener();
                }
            };

            window.addEventListener('beforeunload', unloadListener);
            document.addEventListener('visibilitychange', visibilityHandler);

            console.log('Clicked on SERP answer:', serpAnswer);
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
