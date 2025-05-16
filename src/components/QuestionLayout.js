import Header from './Header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';
import languages from '../data/languages.js';

export default function QuestionLayout({ children }) {

    const { questionId } = useParams();

    const { gameState } = useGameState();
    const gameLanguage = gameState.gameLanguage;
    const gameText = languages[ gameLanguage ];

    const question = gameText.questions[ questionId - 1 ];


    return (
        <div className='mainContainer'>
            <Header />
            <div id='questionWrapper'>
                <div className='containerCard' id='questionCard'>
                    <h3>{gameText.QuestionHeader}</h3>
                    <h2>{question.text}</h2>
                </div>
                {children}
            </div>
            <Footer />
        </div>
    );
}
