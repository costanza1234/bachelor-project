import React, { useState } from 'react';
import { InputWithButton } from '../components/InputWithButton';
import { useParams } from 'react-router-dom';
import Answer from '../components/Answer';
import Results from '../components/Results';
import QuestionLayout from '../components/QuestionLayout';
import tracker from '../utils/tracker';

export default function Question() {
    const { questionId, AI_flag } = useParams();

    const isAI = AI_flag === 'true' ? true : false;

    const [ inputValue, setInputValue ] = useState('');
    const [ result, setResult ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);


    const handleSubmit = async (newResultPromise, isAI, questionId) => {

        setIsLoading(true);

        console.log('isAI:', isAI, 'questionId:', questionId);

        // find the island in tracker.islands based on the islandID. islands is an array of objects
        const island = tracker.islands.find(island => island.islandID === Number(questionId));


        const choice = isAI ? 1 : 0;

        island.islandData.choiceForAnswer.push(choice);

        const query = {
            AI: isAI,
            numberOfQueryTerms: inputValue.split(' ').length,
        }

        island.islandData.numberOfQueryTermsPerQuery.push(query);

        // tracker changed, log it
        console.log("tracker updated:", tracker);

        const result = await newResultPromise;

        console.log('result:', result);

        if (isAI) {
            island.islandData.AIAnswers.push(result);
        }
        else {
            island.islandData.SERPAnswers = result.map((entry, index) => ({
                title: entry.title,
                snippet: entry.snippet || entry.htmlSnippet || '', // fallback if needed
                position: index,
                clicked: false,
                clickOrder: null,
                timeSpentOnPage: null,
            }));
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
                {/* Logo based on isAI */}
                <div className="logoWrapper">
                    <img
                        src={isAI ? '/gemini_logo.png' : '/google_logo.png'}
                        alt={isAI ? 'Gemini AI' : 'Google Search'}
                        className='logoImg'
                    />
                </div>

                {/* Input and results */}
                <div className='inputWrapper'>
                    <InputWithButton
                        isAI={isAI}
                        value={inputValue}
                        onChange={handleInputChange}
                        onSubmit={(newResultPromise) =>
                            handleSubmit(newResultPromise, isAI, questionId)
                        }
                        isLoading={isLoading}
                    />

                </div>
                <Results isAI={isAI} result={result} />
            </div>
            <div className='containerCard'>
                <Answer />
            </div>
        </QuestionLayout>
    );

}
