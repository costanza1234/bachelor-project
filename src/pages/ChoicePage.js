
import { questions } from '../data/questions';
import { useParams, Link } from 'react-router-dom';
import QuestionLayout from '../components/QuestionLayout';

export default function Choice() {
    const { questionId } = useParams();

    return (
        <QuestionLayout>
            <div className='containerCard'>
                <h3>Come vorresti rispondere a questa domanda?</h3>
                <div className='containerCard' id='choiceCard'>
                    <div className='containerCard' id='logoCard'>
                        <Link to={`/MapPage/${questionId}/true`}>
                            <img
                                src='/gemini_logo.png'
                                alt='Gemini AI'
                                className='logoButton'
                            />
                        </Link>
                    </div>
                    <div className='containerCard' id='logoCard'>
                        <Link to={`/MapPage/${questionId}/false`}>
                            <img
                                src='/google_logo.png'
                                alt='Google Search'
                                className='logoButton'
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </QuestionLayout>
    );
}