import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegistrationType () {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user)

    useEffect(() => {
        //dispatch to the leagueOptions saga
        dispatch({
            type: 'GET_LEAGUE_OPTIONS'
        })
    }, []);

    const nextPage = () => {
        history.push('/register_to_play/skill_and_experience')
    }

    const backPage = () => {
        history.push('/register_to_play/player_information')
    }

    return (
        <div>
            <section className='registration-header'>
                <div className='registration-section' >
                    <h6>1.</h6>
                    <div className='registration-section-title'>
                        <h6>Liability</h6>
                        <h6>Acknowledgment</h6>
                        <h6>✅</h6>
                    </div>
                </div>
                <div className='registration-section' >
                    <h6>2.</h6>
                    <div className='registration-section-title'>
                        <h6>Player</h6>
                        <h6>Information</h6>
                        <h6>✅</h6>
                    </div>
                </div>
                <div className='registration-section' id='current-registration-section'>
                    <h6>3.</h6>
                    <div className='registration-section-title'>
                        <h6>Registration</h6>
                        <h6>Type</h6>
                    </div>
                </div>
                <div className='registration-section'>
                    <h6>4.</h6>
                    <div className='registration-section-title'>
                        <h6>Skill &</h6>
                        <h6>Experience</h6>
                    </div>
                </div >
                <div className='registration-section'>
                    <h6>5.</h6>
                    <div className='registration-section-title'>
                        <h6>Review &</h6>
                        <h6>Submit</h6>
                    </div>
                </div>
            </section>
            <section className='registration-form'>
                <h3>Registration Type</h3>
                <div>
                    <label htmlFor='league'>What league are you registering for?</label>
                    <select name='leagues' id='league'>
                        {/* will need to map from leagues table */}
                        <option value='gold'>Gold on Tuesday nighs</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='type'>How are you registering to play?</label>
                    <select name='type' id='type'>
                        {/* will need to map from registration_type table */}
                        <option value='individual'>Individual</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='smallGroup'> If you chose "small group", put the names of the palyers with which you are registering below.</label>
                    <input 
                        id='smallGroup'
                    />
                </div>
                <div>
                    <label htmlFor='team'> If you chose "team", put the name of your team below.</label>
                    <input 
                        id='team'
                    />
                </div>
                <div>
                    <p>Are you curerntly a team captain or are you insterested in being a team captain?</p>
                    <div>
                        <span>
                            <input 
                                type='radio'
                                id='yes'
                                name='yes'
                                value='true'
                            />
                            <label htmlFor='yes'>yes</label>
                        </span>
                        <span>
                            <input 
                                type='radio'
                                id='no'
                                name='no'
                                value='false'
                            />
                            <label htmlFor='no'>no</label>
                        </span>
                     </div>
                </div>
            </section>
            <section className='back-next-buttons'>
                <button onClick={backPage}>BACK</button>
                <button onClick={nextPage}>NEXT</button>
            </section>
        </div>
    )
}

export default RegistrationType