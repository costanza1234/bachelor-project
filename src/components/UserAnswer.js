import { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext.js';
import languages from '../data/languages.js';

export default function UserAnswer() {
    const [ text, setText ] = useState('');
    const navigate = useNavigate();
    const { questionId } = useParams();
    const idx = parseInt(questionId, 10);

    const {
        gameState,
        setSubmitTime,
        setUserAnswer,
        completeIsland,
        incrementScore,
        update
    } = useGameState();

    const { gameLanguage } = gameState;
    const gameText = languages[ gameLanguage ];

    const handleSubmit = () => {
        if (!text) return;

        const islandID = Number(questionId);
        const now = new Date();

        setSubmitTime(islandID, now);

        setUserAnswer(islandID, text);

        completeIsland(idx);

        incrementScore(10);

        console.log('Answer submitted:', {
            islandID,
            text,
            time: now.toISOString()
        });

        navigate('/MapPage');
    };

    useEffect(() => {
        if (
            gameState.islandCompletionOrder.length === 6 &&
            !gameState.finishTime // prevent infinite loop
        ) {
            const finish = new Date();
            const start = new Date(gameState.startTime);
            const sessionLength = (finish - start) / 1000;

            update({
                finishTime: finish,
                sessionLength,
            });

            navigate('/FinishPage');
        }
    }, [ gameState.islandCompletionOrder, gameState.finishTime, gameState.startTime, update, navigate ]);


    return (
        <div className="answer-wrapper">
            <label htmlFor="answer-textarea"><h3>{gameText.AnswerTextarea}</h3></label>
            <textarea
                id="answer-textarea"
                className="text-area"
                placeholder={gameText.AnswerPlaceholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
            />
            <Button
                onClick={handleSubmit}
                radius="lg"
                variant="filled"
                color="rgb(71, 159, 203)"
            >
                {gameText.AnswerButton}
            </Button>
        </div>
    );
}
