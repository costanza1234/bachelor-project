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
            <div id='questionWrapper'>
                <div className='containerCard' id='questionCard'>
                    <h3>Domanda: </h3>
                    <h2>{question.text}</h2>
                </div>
                {questionId != 7 && (
                    <div className='containerCard' id='resultsCard'>
                        <div className="inputWrapper">
                            <InputWithButton />
                        </div>
                        <Results question={question} />
                    </div>
                )}
                <div className='containerCard'>
                    <Answer />
                </div>
            </div>
        </div>
    );
}
