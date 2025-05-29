import { useState } from 'react';
import { QueryInput } from '../components/QueryInput';
import { useParams } from 'react-router-dom';
import UserAnswer from '../components/UserAnswer';
import Results from '../components/Results';
import QuestionLayout from '../components/QuestionLayout';
import { useGameState } from '../utils/GameStateContext';

/**
 * Question component renders the main interface for answering a question using either AI or search engine results.
 * 
 * - Extracts `questionId` and `AI_flag` from the URL parameters to determine the mode (AI or search engine).
 * - Manages state for the query input, result, and loading status.
 * - Handles query submission, records user choices and query metadata, and stores results appropriately.
 * - Renders the query input, results, and user answer input components.
 * 
 * @component
 * @returns {JSX.Element} The rendered Question page component.
 */

export default function Question() {

    // Extract questionId and AI_flag from the URL parameters
    const { questionId, AI_flag } = useParams();
    const isAI = AI_flag === 'true';

    // State management for query input, result, and loading status
    const [ inputValue, setInputValue ] = useState('');
    const [ result, setResult ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const { addQuery } = useGameState();

    const handleSubmit = async (newResultPromise, isAI, questionId) => {

        setIsLoading(true);
        const islandID = Number(questionId);

        const queryText = inputValue.trim();
        const queryMeta = {
            AI: isAI ? 1 : 0,
            query: queryText,
            numberOfQueryTerms: queryText.split(/\s+/).length,
        };

        const resultData = await newResultPromise;

        console.log('result:', resultData);

        // Add unified query object
        addQuery(islandID, {
            ...queryMeta,
            answer: isAI
                ? resultData // AI answer as string
                : resultData.map((entry, index) => ({
                    title: entry.title,
                    snippet: entry.snippet || entry.htmlSnippet || '',
                    position: index + 1,
                    clicked: false,
                    clickOrder: null,
                    timeSpentOnPage_seconds: null,
                })),
        });

        setResult(resultData);
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Render the component UI
    return (
        <QuestionLayout>

            {/* Card containing the query input and results */}
            <div className='containerCard' id='resultsCard'>

                {/* Logo for AI or Google */}
                <div className="logoWrapper">
                    <img
                        src={isAI ? '/gemini_logo.png' : '/google_logo.png'}
                        alt={isAI ? 'Gemini AI' : 'Google Search'}
                        className='logoImg'
                    />
                </div>

                {/* Query input component */}
                <div className='inputWrapper'>
                    <QueryInput
                        isAI={isAI}
                        value={inputValue}
                        onChange={handleInputChange}
                        onSubmit={(newResultPromise) =>
                            handleSubmit(newResultPromise, isAI, questionId)
                        }
                        isLoading={isLoading}
                    />
                </div>

                {/* Results component to display query results */}
                <Results isAI={isAI} result={result} questionId={questionId} />
            </div>

            {/* Card containing the user answer input */}
            <div className='containerCard'>
                <UserAnswer />
            </div>
        </QuestionLayout>
    );
}
