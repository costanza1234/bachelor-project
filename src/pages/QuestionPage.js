import React, { useState } from 'react';
import Header from '../components/Header';
import { InputWithButton } from '../components/InputWithButton';
import { questions } from '../data/questions';
import { useParams } from 'react-router-dom';
import Answer from '../components/Answer';
import Results from '../components/Results';

export default function Question() {
    const { questionId } = useParams();
    const question = questions[ questionId - 1 ];
    const isAI = question.isAI;

    const [ inputValue, setInputValue ] = useState('');
    const [ result, setResult ] = useState(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (newResult) => {
        setResult(newResult); // Store the result from InputWithButton
    };

    return (
        <div className='mainContainer'>
            <Header />
            <div id='questionWrapper'>
                <div className='containerCard' id='questionCard'>
                    <h3>Domanda: </h3>
                    <h2>{question.text}</h2>
                </div>
                {questionId != 7 && (
                    <div className='containerCard' id='resultsCard'>
                        <div className="inputWrapper">
                            <InputWithButton
                                isAI={isAI}
                                value={inputValue}
                                onChange={handleInputChange}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <Results isAI={isAI} result={result} />
                    </div>
                )}
                <div className='containerCard'>
                    <Answer />
                </div>
            </div>
        </div>
    );
}
