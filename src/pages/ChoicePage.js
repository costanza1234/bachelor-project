import Header from '../components/Header';
import { questions } from '../data/questions';
import { useParams, Link } from 'react-router-dom';
import BackArrow from '../components/backArrow';

export default function Choice() {
    const { questionId } = useParams();

    const question = questions[ questionId - 1 ];

    return (
        <div className='mainContainer'>
            <Header />
            <div id='questionWrapper'>
                <div className='containerCard' id='questionCard'>
                    <h3>Domanda: </h3>
                    <h2>{question.text}</h2>
                </div>
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
            </div>
            <BackArrow />
        </div>
    );
}
