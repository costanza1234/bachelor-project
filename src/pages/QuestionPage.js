import React, { useState } from 'react';
import { InputWithButton } from '../components/InputWithButton';
import { useParams } from 'react-router-dom';
import Answer from '../components/Answer';
import Results from '../components/Results';
import QuestionLayout from '../components/QuestionLayout';

export default function Question() {
    const { questionId, AI_flag } = useParams();

    const isAI = AI_flag === 'true' ? true : false;

    const [ inputValue, setInputValue ] = useState('');
    const [ result, setResult ] = useState(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (newResult) => {
        setResult(newResult); // Store the result from InputWithButton
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
                        onSubmit={handleSubmit}
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
