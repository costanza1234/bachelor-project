import { useParams, useNavigate } from 'react-router-dom';
import QuestionLayout from '../components/QuestionLayout';
import languages from '../data/languages';
import { useGameState } from '../utils/GameStateContext';


/**
 * Choice component renders a UI for the user to select between two options (Gemini AI or Google Search).
 * It retrieves the current question ID from the URL, accesses the game state and language,
 * and navigates to the next page based on the user's selection.
 *
 * @component
 * @returns {JSX.Element} The rendered Choice page component.
 *
 * // Renders the choice page for a specific question
 */
export default function ChoicePage() {

    const { addChoiceForAnswer } = useGameState(); // Function to record user choice

    // Get the questionId parameter from the URL
    const { questionId } = useParams();

    // Get the navigate function to programmatically change routes
    const navigate = useNavigate();

    // Access the game state from context
    const { gameState } = useGameState();

    // Get the current game language from the game state
    const gameLanguage = gameState.gameLanguage;

    // Retrieve the language-specific text for the UI
    const gameText = languages[ gameLanguage ];

    // Handle user choice by navigating to the appropriate path
    const handleChoice = (path) => {

        // Determine if the choice is for AI or search engine
        const isAI = path.includes('true');

        // Record the choide (AI or search engine)
        addChoiceForAnswer(questionId, isAI ? 1 : 0);
        navigate(path);

    };

    return (
        // Use the QuestionLayout component to wrap the content
        <QuestionLayout>
            <div className='containerCard'>

                {/* Display the question text */}
                <h3>{gameText.QuestionChoice}</h3>

                <div className='containerCard' id='choiceCard'>

                    {/* Option 1: Gemini AI */}
                    <div className='containerCard' id='logoCard'>
                        <img
                            src='/gemini_logo.png' // Gemini logo image
                            alt='Gemini AI' // Alternative text for accessibility
                            className='logoButton' // CSS class for styling
                            onClick={() => handleChoice(`/MapPage/${questionId}/true`)} // Navigate on click
                        />
                    </div>

                    {/* Option 2: Google Search */}
                    <div className='containerCard' id='logoCard'>

                        <img
                            src='/google_logo.png' // Google logo image
                            alt='Google Search' // Alternative text for accessibility
                            className='logoButton' // CSS class for styling
                            onClick={() => handleChoice(`/MapPage/${questionId}/false`)} // Navigate on click
                        />
                    </div>
                </div>
            </div>
        </QuestionLayout>
    );
}