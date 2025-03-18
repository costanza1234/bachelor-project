import React from 'react';
import Header from '../components/Header';
import '../styles/styles.css';
import { InputWithButton } from '../components/InputWithButton';

export default function Question({ question }) {

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
