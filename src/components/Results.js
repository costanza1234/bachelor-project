import ReactMarkdown from 'react-markdown';
import { useGameState } from '../utils/GameStateContext';

/**
 * Results component displays either an AI-generated response or a list of SERP (Search Engine Results Page) answers.
 * Handles user interactions with SERP answers, including tracking clicks and time spent on each result.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isAI - If true, renders an AI response; otherwise, renders SERP results.
 * @param {string|Array<Object>} props.result - The AI response as a string or an array of SERP result objects.
 * @param {number|string} props.questionId - The ID of the current question/island.
 *
 * @returns {JSX.Element|null} The rendered results or null if no result is provided.
 */

export default function Results({ isAI, result, questionId }) {

    // Access game state and updater from context
    const { gameState, updateIslandData } = useGameState();

    // If no result, render nothing
    if (!result || (Array.isArray(result) && result.length === 0)) {
        return null;
    }

    // Handles click on a SERP answer
    const handleClick = (index) => {
        const islandID = Number(questionId);

        // Find the relevant island in the game state
        const island = gameState.islands.find(island => island.islandID === islandID);

        const serpAnswer = island?.islandData?.SERPAnswers?.[ index ];

        // Only proceed if answer exists and hasn't been clicked yet
        if (serpAnswer && !serpAnswer.clicked) {
            const clickTime = Date.now();

            // Update state: mark answer as clicked and assign clickOrder
            updateIslandData(islandID, (data) => {
                const clickedCount = data.SERPAnswers.filter(a => a.clicked).length;
                const updatedSERPAnswers = data.SERPAnswers.map((ans, i) => {
                    if (i === index) {
                        return {
                            ...ans,
                            clicked: true,
                            clickOrder: clickedCount + 1,
                            timeSpentOnPage_seconds: null, // Will be set on unload
                        };
                    }
                    return ans;
                });
                return { ...data, SERPAnswers: updatedSERPAnswers };
            });

            // Listener to capture time spent on the page
            const unloadListener = () => {
                const timeSpent = Date.now() - clickTime;
                const secondsSpent = timeSpent / 1000;
                updateIslandData(islandID, (data) => {
                    const updated = [ ...data.SERPAnswers ];
                    const target = updated[ index ];
                    if (target) target.timeSpentOnPage_seconds = secondsSpent;
                    return { ...data, SERPAnswers: updated };
                });

                // Clean up event listeners
                window.removeEventListener('beforeunload', unloadListener);
                document.removeEventListener('visibilitychange', visibilityHandler);
            };

            // Listener for tab visibility changes
            const visibilityHandler = () => {
                if (document.visibilityState === 'hidden') {
                    unloadListener();
                }
            };

            // Register event listeners
            window.addEventListener('beforeunload', unloadListener);
            document.addEventListener('visibilitychange', visibilityHandler);

            console.log('Clicked on SERP answer:', serpAnswer);
        }
    };

    // If AI response, render markdown
    if (isAI) {
        return (
            <div className="response">
                <div className="AI-response">
                    <ReactMarkdown>{result || "Come posso aiutarti?"}</ReactMarkdown>
                </div>
            </div>
        );
    }

    // Otherwise, render SERP results
    return (
        <div className="response">
            {result.map((r, i) => (
                <div className="result-item" key={i}>
                    <div className="result-header">
                        {/* Favicon for the result */}
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

                    {/* Title as a clickable link, triggers handleClick */}
                    <a
                        href={r.formattedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="result-title"
                        onClick={() => handleClick(i)}
                    >
                        {r.title}
                    </a>
                    {/* Snippet/description of the result */}
                    <div className="result-snippet">{r.snippet}</div>
                </div>
            ))}
        </div>
    );
}
