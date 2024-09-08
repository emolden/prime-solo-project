import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegistrationType () {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user)
    const leagueOptions = useSelector(store => store.leagueOptions)
    const registrationTypes = useSelector(store => store.registrationTypes) 
    
    const [silver, setSilver] = useState(false)
    const [bronze, setBronze] = useState(false)
    const [silverRegistrationType, setSilverRegistrationType] = useState('individual')
    const [bronzeRegistrationType, setBronzeRegistrationType] = useState('individual')
    const [silverSmallGroup, setSilverSmallGroup] = useState('')
    const [silverTeam, setSilverTeam] = useState('')
    const [bronzeSmallGroup, setBronzeSmallGroup] = useState('')
    const [bronzeTeam, setBronzeTeam] = useState('')
    const [silverCaptain, setSilverCaptain] = useState('')
    const [bronzeCaptain, setBronzeCaptain] = useState('')
    useEffect(() => {
        console.log('dispatch on page load')
        //dispatch to the leagueOptions saga
        dispatch({
            type: 'GET_LEAGUE_OPTIONS'
        })
        dispatch({
            type: 'GET_REGISTRATION_TYPES'
        })
    }, []);

    const nextPage = () => {
        history.push('/register_to_play/skill_and_experience')

        if(silver === true) {
            let silverLeagueRegistration = {
                leauge_id: leagueOptions[0].id,
                registration_type: silverRegistrationType,
                small_group_input: silverSmallGroup,
                team_input: silverTeam,
                is_captain: silverCaptain
            }
            // console.log('silver league registration submitted: ', silverLeagueRegistration)
            dispatch({
                type: 'SILVER_LEAUGE_REGISTRATION',
                payload: silverLeagueRegistration
            })
        }
        if(bronze === true) {
            let bronzeLeagueRegistration = {
                leauge_id: leagueOptions[1].id,
                registration_type: bronzeRegistrationType,
                small_group_input: bronzeSmallGroup,
                team_input: bronzeTeam,
                is_captain: bronzeCaptain
            }
            // console.log('bronze league registration submitted: ', bronzeLeagueRegistration)
            dispatch({
                type: 'BRONZE_LEAGUE_REGISTRATION',
                payload: bronzeLeagueRegistration
            })
        }
    }

    const backPage = () => {
        history.push('/register_to_play/player_information')
    }

    const checkSilver = () => {
        setSilver(!silver);  
    }

    const checkBronze = () => {
        setBronze(!bronze);  
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
                    <p>What league are you registering for?</p>

                        {leagueOptions.length && 
                        <>
                        <div>
                            <input
                                key={leagueOptions[0].id}
                                value={leagueOptions[0].id}
                                type='checkbox'
                                name={leagueOptions[0].name}
                                checked={silver}
                                onChange={checkSilver}
                            />
                            <label htmlFor={leagueOptions[0].name}>{leagueOptions[0].name} on {leagueOptions[0].day} nights</label>
                        </div>
                        <div>
                            <input
                                key={leagueOptions[1].id}
                                value={leagueOptions[1].id}
                                type='checkbox'
                                name={leagueOptions[1].name}
                                checked={bronze}
                                onChange={checkBronze}
                            />
                            <label htmlFor={leagueOptions[1].name}>{leagueOptions[1].name} on {leagueOptions[1].day} nights</label>
                        </div>
                        </>
                        }
                </div>
                {silver &&
                <div className='silver-league'>
                    <h4>For {leagueOptions[0].name} League</h4>
                    <div>
                        <label htmlFor='type'>How are you registering to play?</label>
                        <select name='type' id='type' onChange={(e) => setSilverRegistrationType(e.target.value)}>
                            {registrationTypes.map((type) => {
                                return (
                                    <option 
                                        key={type.id} 
                                        value={type.type}
                                        
                                    >
                                    {type.type}
                                    </option>
                                )
                            })}
                            
                        </select>
                    </div>
                    {silverRegistrationType === 'Small Group' &&
                    <div>
                        <label htmlFor='smallGroup'> If you chose "small group", put the names of the palyers with which you are registering below.</label>
                        <input 
                            id='smallGroup'
                            value={silverSmallGroup}
                            onChange={(e) => setSilverSmallGroup(e.target.value)}
                        />
                    </div>}
                    {silverRegistrationType === 'Team' &&
                    <div>
                        <label htmlFor='team'> If you chose "team", put the name of your team below.</label>
                        <input 
                            id='team'
                            value={silverTeam}
                            onChange={(e) => setSilverTeam(e.target.value)}
                        />
                    </div>}
                    <div>
                        <p>Are you curerntly a team captain or are you insterested in being a team captain?</p>
                        <div>
                            <span>
                                <input 
                                    type='radio'
                                    id='yesSilverCaptain'
                                    name='silverCaptain'
                                    value='true'
                                    onChange={(e) => setSilverCaptain(e.target.value)}
                                />
                                <label htmlFor='yesSilverCaptain'>yes</label>
                            </span>
                            <span>
                                <input 
                                    type='radio'
                                    id='noSiverCaptain'
                                    name='silverCaptain'
                                    value='false'
                                    onChange={(e) => setSilverCaptain(e.target.value)}
                                />
                                <label htmlFor='noSilverCaptain'>no</label>
                            </span>
                        </div>
                    </div>
                </div> }
                {bronze &&
                <div className='bronze-league'>
                    <h4>For {leagueOptions[1].name} League</h4>
                    <div>
                        <label htmlFor='type'>How are you registering to play?</label>
                        <select name='type' id='type' onChange={(e) => setBronzeRegistrationType(e.target.value)}>
                            {registrationTypes.map((type) => {
                                return (
                                    <option key={type.id} value={type.type}>{type.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    {bronzeRegistrationType === 'Small Group' &&
                    <div>
                        <label htmlFor='smallGroup'> If you chose "small group", put the names of the palyers with which you are registering below.</label>
                        <input 
                            id='smallGroup'
                            value={bronzeSmallGroup}
                            onChange={(e) => setBronzeSmallGroup(e.target.value)}
                        />
                    </div>}
                    {bronzeRegistrationType === 'Team' &&
                    <div>
                        <label htmlFor='team'> If you chose "team", put the name of your team below.</label>
                        <input 
                            id='team'
                            value={bronzeTeam}
                            onChange={(e) => setBronzeTeam(e.target.value)}
                        />
                    </div>}
                    <div>
                        <p>Are you curerntly a team captain or are you insterested in being a team captain?</p>
                        <div>
                            <span>
                                <input 
                                    type='radio'
                                    id='yesBronzeCaptain'
                                    name='bronzeCaptain'
                                    value='true'
                                    onChange={(e) => setBronzeCaptain(e.target.value)}
                                />
                                <label htmlFor='yesBronzeCaptain'>yes</label>
                            </span>
                            <span>
                            <input 
                                    type='radio'
                                    id='noBronzeCaptain'
                                    name='bronzeCaptain'
                                    value='false'
                                    onChange={(e) => setBronzeCaptain(e.target.value)}
                                />
                                <label htmlFor='noBronzeCaptain'>no</label>
                            </span>
                        </div>
                    </div>
                </div> }
            </section>
            <section className='back-next-buttons'>
                <button onClick={backPage}>BACK</button>
                <button onClick={nextPage}>NEXT</button>
            </section>
        </div>
    )
}

export default RegistrationType