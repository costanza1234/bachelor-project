import { useNavigate } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';

/**
 * ChooseLanguage component renders a language selection page.
 * Allows the user to choose between English and Italian, resets the game state,
 * sets the selected language, and navigates to the GameStart page.
 *
 * @component
 * @returns {JSX.Element} The rendered language selection UI.
 *
 * @example
 * // Usage in a React Router route
 * <Route path="/choose-language" element={<ChooseLanguage />} />
 */
export default function ChooseLanguage() {

    // Get the navigate function from react-router-dom for navigation
    const navigate = useNavigate();

    // Destructure setLanguage and resetGameState from the custom game state context
    const { setLanguage, resetGameState } = useGameState();

    // Function to handle language choice
    const handleChoice = (choice) => {

        // Check if the choice is a string
        if (typeof choice === 'string') {

            // Convert the choice to lowercase
            const lowerCaseChoice = choice.toLowerCase();

            // Log the chosen language to the console
            console.log('Language choice:', lowerCaseChoice);

            // Reset the game state before setting the language
            resetGameState();

            // Set the selected language in the game state
            setLanguage(lowerCaseChoice);

            // Navigate to the GameStart page
            navigate('/GameStart');

        } else {
            // Log an error if the choice is not a string
            console.error('Invalid choice type:', typeof choice);
        }
    };

    // Render the language selection UI
    return (
        <div className='languageChoicePage'>

            {/* Page title */}
            <h1 className='welcomeMessage'>
                Choose your language
            </h1>

            {/* Container for language choice buttons */}
            <div className='containerCard' id='langChoiceCard'>

                {/* English language button */}
                <button
                    className='containerCard'
                    id='logoCard'
                    onClick={() => handleChoice('ENGLISH')}
                >
                    ENGLISH
                </button>

                {/* Italian language button */}
                <button
                    className='containerCard'
                    id='logoCard'
                    onClick={() => handleChoice('ITALIANO')}
                >
                    ITALIANO
                </button>

            </div>
        </div>
    );
}