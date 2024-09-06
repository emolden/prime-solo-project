
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import './RegisterToPlay.css';

function RegisterToPlay ( ) {
    const history = useHistory();

    const startRegistration = () => {
        history.push('/register_to_play/liability_acknowledgment')
    }

    return (
        <div>
            <h1>Register To Play</h1>
            <div className='league-options'>
                <div className='league-details'>
                    <h3>Silver League</h3>
                    <p>Tuesday Nights</p>
                    <p>Double Headers</p>
                    <p>Experienced Players</p>
                    <p>Play Level: C/D</p>
                </div>
                <div className='league-details'>
                    <h3>Silver League</h3>
                    <p>Bronze League</p>
                    <p>Singel Games</p>
                    <p>Players of All Skill Levels</p>
                    <p>Play Level: E (Recreactional)</p>
                </div>
            </div>
            <div className='start-registration'>
                <button  onClick={startRegistration}>Start Registration</button>
            </div>
        </div>
    )
}

export default RegisterToPlay;