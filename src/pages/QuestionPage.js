import React from 'react';
import Header from '../components/Header';
import '../styles/styles.css';
import { InputWithButton } from '../components/InputWithButton';
import { questions } from '../data/questions';
import { useParams } from 'react-router-dom';

export default function Question() {

    const { questionId } = useParams();

    const question = questions[ questionId ]

    const isAI = question.isAI;

    return (
        <div className='mainContainer'>
            <Header />
            <div className='questionContainer'>
                <h2>{question.text}</h2>
            </div>
            <InputWithButton />
            <div className='resultsContainer'>
            </div>
            <div className='answerContainer'>
            </div>
        </div>
    );
}
