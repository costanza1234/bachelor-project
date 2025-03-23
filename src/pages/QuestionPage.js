import React from 'react';
import Header from '../components/Header';
import { InputWithButton } from '../components/InputWithButton';
import { questions } from '../data/questions';
import { useParams } from 'react-router-dom';
import Answer from '../components/Answer';
import Results from '../components/Results';

export default function Question() {

    const { questionId } = useParams();
    console.log('questionId:', questionId);

    const question = questions[ questionId - 1 ]

    console.log('question:', question);

    const isAI = question.isAI;

    return (
        <div className='mainContainer'>
            <Header />
            <div className='questionWrapper'>
                <div className='questionContainer'>
                    <h2>{question.text}</h2>
                </div>
                <div className="inputWrapper">
                    <InputWithButton />
                </div>
                <div className='resultsContainer'>
                    <Results question={question} />
                </div>
                <div className='answerContainer'>
                    <Answer />
                </div>
            </div>
        </div>
    );
}
