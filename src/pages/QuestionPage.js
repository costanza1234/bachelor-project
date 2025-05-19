import { useState } from 'react';
import { QueryInput } from '../components/QueryInput';
import { useParams } from 'react-router-dom';
import UserAnswer from '../components/UserAnswer';
import Results from '../components/Results';
import QuestionLayout from '../components/QuestionLayout';
import { useGameState } from '../utils/GameStateContext';

export default function Question() {
    const { questionId, AI_flag } = useParams();
    const isAI = AI_flag === 'true';

    const [ inputValue, setInputValue ] = useState('');
    const [ result, setResult ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const {
        addChoiceForAnswer,
        addQueryMeta,
        addAIAnswer,
        addSERPAnswers
    } = useGameState();

    const handleSubmit = async (newResultPromise, isAI, questionId) => {
        setIsLoading(true);
        const islandID = Number(questionId);

        console.log('isAI:', isAI, 'questionId:', islandID);

        // Record the query source
        addChoiceForAnswer(islandID, isAI ? 1 : 0);

        // Record query term metadata
        const query = {
            AI: isAI,
            query: inputValue,
            numberOfQueryTerms: inputValue.trim().split(/\s+/).length,
        };
        addQueryMeta(islandID, query);

        const result = await newResultPromise;
        console.log('result:', result);

        if (isAI) {
            addAIAnswer(islandID, result);
        } else {
            const formatted = result.map((entry, index) => ({
                title: entry.title,
                snippet: entry.snippet || entry.htmlSnippet || '',
                position: index + 1,
                clicked: false,
                clickOrder: null,
                timeSpentOnPage: null,
            }));
            addSERPAnswers(islandID, formatted);
        }

        setResult(result);
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <QuestionLayout>
            <div className='containerCard' id='resultsCard'>
                <div className="logoWrapper">
                    <img
                        src={isAI ? '/gemini_logo.png' : '/google_logo.png'}
                        alt={isAI ? 'Gemini AI' : 'Google Search'}
                        className='logoImg'
                    />
                </div>

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

                <Results isAI={isAI} result={result} questionId={questionId} />
            </div>

            <div className='containerCard'>
                <UserAnswer />
            </div>
        </QuestionLayout>
    );
}
