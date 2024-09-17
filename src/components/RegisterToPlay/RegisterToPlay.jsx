
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './RegisterToPlay.css';

function RegisterToPlay ( ) {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const user = useSelector(store => store.user)
    // const softballRegistration = useSelector(store => store.softballRegistration)

   
    const startRegistration = () => {
        //send the user.id to the softballRegistration reducer so that
        // the POST request at the end of the registration process will know
        // which user is registering to play
        // console.log('started registration!: ', user.id);
        // dispatch({
        //     type: `SET_USER_REGISTERING_TO_PLAY`,
        //     payload: user.id
        // })
        //go to the nex page, liability acknowledgment
        history.push('/register_to_play/liability_acknowledgment')
    }

    return (
        <div>
            <h1>Register To Play</h1>
            <h2>League Options</h2>
            <div className='league-options'>
                <div className='league-details'>
                    <h3>Silver League</h3>
                    <p>Tuesday Nights</p>
                    <p>Double Headers</p>
                    <p>Experienced Players</p>
                    <p>Play Level: C/D</p>
                </div>
                <div className='league-details'>
                    <h3>Bronze League</h3>
                    <p>Thursday Nights</p>
                    <p>Singel Games</p>
                    <p>Players of All Skill Levels</p>
                    <p>Play Level: E (Recreational)</p>
                </div>
            </div>
            <div className='start-registration'>
                <button  className="btn" onClick={startRegistration}>Start Registration</button>
            </div>
        </div>
    )
}

export default RegisterToPlay;