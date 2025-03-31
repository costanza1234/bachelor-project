// components/QuestionLayout.jsx
import React from 'react';
import Header from './Header';
import BackArrow from './backArrow';
import { questions } from '../data/questions';
import { useParams } from 'react-router-dom';

export default function QuestionLayout({ children }) {
    const { questionId } = useParams();
    const question = questions[ questionId - 1 ];

    return (
        <div className='mainContainer'>
            <Header />
            <div id='questionWrapper'>
                <div className='containerCard' id='questionCard'>
                    <h3>Domanda: </h3>
                    <h2>{question.text}</h2>
                </div>
                {children}
            </div>
            <BackArrow />
        </div>
    );
}
