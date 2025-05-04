// components/QuestionLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import questions from '../data/questions';

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
            <Footer />
        </div>
    );
}
