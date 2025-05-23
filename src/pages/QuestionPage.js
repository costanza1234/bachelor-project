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

    // Determine if the current mode is AI based on the flag
    const isAI = AI_flag === 'true';

    // State for the input value in the query box
    const [ inputValue, setInputValue ] = useState('');

    // State for the result returned from the query
    const [ result, setResult ] = useState(null);

    // State to indicate if a query is currently loading
    const [ isLoading, setIsLoading ] = useState(false);

    // Destructure functions from the game state context
    const {
        addChoiceForAnswer, // Records the user's choice (AI or not)
        addQueryMeta,       // Records metadata about the query
        addAIAnswer,        // Stores the AI's answer
        addSERPAnswers      // Stores the search engine results
    } = useGameState();

    // Handles submission of a query
    const handleSubmit = async (newResultPromise, isAI, questionId) => {

        setIsLoading(true); // Set loading state to true

        const islandID = Number(questionId); // Convert questionId to a number

        console.log('isAI:', isAI, 'questionId:', islandID);

        // Record the source of the query (AI or search engine)
        addChoiceForAnswer(islandID, isAI ? 1 : 0);

        // Create and record metadata about the query
        const query = {
            AI: isAI,
            query: inputValue,
            numberOfQueryTerms: inputValue.trim().split(/\s+/).length,
        };
        addQueryMeta(islandID, query);

        // Await the result from the query
        const result = await newResultPromise;
        console.log('result:', result);

        if (isAI) {
            // If AI mode, store the AI's answer
            addAIAnswer(islandID, result);
        } else {
            // If search engine mode, format and store the SERP answers
            const formatted = result.map((entry, index) => ({
                title: entry.title,
                snippet: entry.snippet || entry.htmlSnippet || '',
                position: index + 1,
                clicked: false,
                clickOrder: null,
                timeSpentOnPage_seconds: null,
            }));
            addSERPAnswers(islandID, formatted);
        }

        setResult(result);      // Update the result state
        setIsLoading(false);    // Set loading state to false
    };

    // Handles changes in the input box
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
