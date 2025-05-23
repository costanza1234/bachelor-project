import Layout from './Layout';
import { useParams } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages.js';

/**
 * Layout component for displaying a question and its related content.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to render within the layout.
 * @returns {JSX.Element} The rendered question layout.
 *
 * @example
 * <QuestionLayout>
 *   <AnswerOptions />
 * </QuestionLayout>
 *
 * @description
 * Retrieves the current question based on the URL parameter and game state,
 * displays the question header and text, and renders any child components.
 */

export default function QuestionLayout({ children }) {

    // Get the questionId from the URL parameters
    const { questionId } = useParams();

    // Get the current game state from context
    const { gameState } = useGameState();

    // Extract the selected game language
    const { gameLanguage } = gameState;

    // Get the language-specific text content
    const gameText = languages[ gameLanguage ];

    // Get the current question object based on questionId
    const question = gameText.questions[ questionId - 1 ];

    // Render the layout with the question and any child components
    return (
        <Layout>
            <div id='questionWrapper'>
                <div className='containerCard' id='questionCard'>

                    {/* Display the question header */}
                    <h3>{gameText.QuestionHeader}</h3>

                    {/* Display the question text */}
                    <h2>{question.text}</h2>
                </div>

                {/* Render any child components passed to this layout */}
                {children}

            </div>
        </Layout>
    );
}
