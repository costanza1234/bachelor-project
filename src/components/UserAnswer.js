
import { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext.js';
import languages from '../data/languages.js';

/**
 * UserAnswer component allows the user to submit an answer to a question.
 * 
 * - Manages the user's answer input and submission.
 * - Updates game state with the user's answer, submission time, and score.
 * - Navigates to the map page after submission.
 * - If all islands are completed, records the finish time and navigates to the finish page.
 *
 * @component
 * @returns {JSX.Element} The rendered UserAnswer component.
 *
 * @example
 * <UserAnswer />
 */

export default function UserAnswer() {

    // State for the user's answer text
    const [ text, setText ] = useState('');

    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    // Get the questionId parameter from the URL
    const { questionId } = useParams();

    // Parse questionId as an integer index
    const idx = parseInt(questionId, 10);

    // Destructure game state and updater functions from context
    const {
        gameState,
        setSubmitTime,
        setUserAnswer,
        completeIsland,
        incrementScore,
        update
    } = useGameState();

    // Get the current game language from state
    const { gameLanguage } = gameState;

    // Get the localized text for the current language
    const gameText = languages[ gameLanguage ];


    // Function to handle answer submission
    const handleSubmit = () => {

        // Do nothing if the answer text is empty
        if (!text) return;

        // Convert questionId to a number for islandID
        const islandID = Number(questionId);

        // Get the current time
        const now = new Date();

        // Record the submission time for this island
        setSubmitTime(islandID, now);

        // Save the user's answer for this island
        setUserAnswer(islandID, text);

        // Mark this island as completed
        completeIsland(idx);

        // Increment the user's score by 10 points
        incrementScore(10);

        // Log the submission for debugging
        console.log('Answer submitted:', {
            islandID,
            text,
            time: now.toISOString()
        });

        // Navigate to the map page
        navigate('/MapPage');
    };

    // Effect to check if all islands are completed and handle finish logic
    useEffect(() => {

        // If all 6 islands are completed and finishTime is not set
        if (
            gameState.islandCompletionOrder.length === 6 &&
            !gameState.finishTime // prevent infinite loop
        ) {
            // Get the finish time
            const finish = new Date();

            // Get the start time from game state
            const start = new Date(gameState.startTime);

            // Calculate session length in seconds
            const sessionLength_seconds = (finish - start) / 1000;

            // Update game state with finish time and session length
            update({
                finishTime: finish,
                sessionLength_seconds,
            });

            // Navigate to the finish page
            navigate('/FinishPage');
        }
        // Dependencies for the effect
    }, [ gameState.islandCompletionOrder, gameState.finishTime, gameState.startTime, update, navigate ]);


    // Render the answer input UI
    return (
        <div className="answer-wrapper">

            {/* Label for the answer textarea */}
            <label htmlFor="answer-textarea"><h3>{gameText.AnswerTextarea}</h3></label>

            {/* Textarea for user to input their answer */}
            <textarea
                id="answer-textarea"
                className="text-area"
                placeholder={gameText.AnswerPlaceholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
            />

            {/* Submit button */}
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
