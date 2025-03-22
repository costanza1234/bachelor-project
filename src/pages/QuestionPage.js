import React from 'react';
import Header from '../components/Header';
import '../styles/styles.css';
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
            <div className='questionContainer'>
                <h2>{question.text}</h2>
            </div>
            <InputWithButton />
            <div className='resultsContainer'>
                <Results question={question} />
            </div>
            <div className='answerContainer'>
                <Answer />
            </div>
        </div>
    );
}
