import { useParams, useNavigate } from 'react-router-dom';
import QuestionLayout from '../components/QuestionLayout';
import languages from '../data/languages';
import { useGameState } from '../utils/GameStateContext';

export default function Choice() {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const { gameState } = useGameState();
    const gameLanguage = gameState.gameLanguage;
    const gameText = languages[ gameLanguage ];

    const handleChoice = (path) => {
        navigate(path);
    };

    return (
        <QuestionLayout>
            <div className='containerCard'>
                <h3>{gameText.QuestionChoice}</h3>
                <div className='containerCard' id='choiceCard'>
                    <div className='containerCard' id='logoCard'>
                        <img
                            src='/gemini_logo.png'
                            alt='Gemini AI'
                            className='logoButton'
                            onClick={() => handleChoice(`/MapPage/${questionId}/true`)}
                        />
                    </div>
                    <div className='containerCard' id='logoCard'>
                        <img
                            src='/google_logo.png'
                            alt='Google Search'
                            className='logoButton'
                            onClick={() => handleChoice(`/MapPage/${questionId}/false`)}
                        />
                    </div>
                </div>
            </div>
        </QuestionLayout>
    );
}