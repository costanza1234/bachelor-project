import { useNavigate } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';

export default function Choice() {
    const navigate = useNavigate();

    const { setLanguage, resetGameState } = useGameState();


    const handleChoice = (choice) => {
        if (typeof choice === 'string') {
            const lowerCaseChoice = choice.toLowerCase();
            console.log('Language choice:', lowerCaseChoice);
            resetGameState();
            setLanguage(lowerCaseChoice);
            navigate('/GameStart');
        } else {
            console.error('Invalid choice type:', typeof choice);
        }
    };

    return (
        <div className='languageChoicePage'>
            <h1 className='welcomeMessage'>
                Choose your language
            </h1>
            <div className='containerCard' id='langChoiceCard'>

                <button
                    className='containerCard'
                    id='logoCard'
                    onClick={() => handleChoice('ENGLISH')}
                >
                    ENGLISH
                </button>

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