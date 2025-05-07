import { useParams, useNavigate } from 'react-router-dom';
import QuestionLayout from '../components/QuestionLayout';

export default function Choice() {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const handleChoice = (path) => {
        navigate(path);
    };

    return (
        <QuestionLayout>
            <div className='containerCard'>
                <h3>Come vorresti rispondere a questa domanda?</h3>
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