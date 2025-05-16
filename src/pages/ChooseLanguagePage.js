import { useNavigate } from 'react-router-dom';
import { useGameState } from '../utils/GameStateContext';

export default function Choice() {
    const navigate = useNavigate();

    const { setLanguage } = useGameState();


    const handleChoice = (choice) => {
        setLanguage(choice);
        navigate('/GameStart');
    };

    return (
        <div>
            <div className='containerCard'>
                <div className='containerCard' id='choiceCard'>
                    <div className='containerCard' id='logoCard'>
                        ENGLISH
                    </div>
                    <div className='containerCard' id='logoCard'>
                        ITALIANO
                    </div>
                </div>
            </div>
        </div>
    );
}