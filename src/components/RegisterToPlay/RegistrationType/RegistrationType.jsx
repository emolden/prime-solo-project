import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//??????????? include a DELETE request ?????????????

function RegistrationType () {

    const history = useHistory();
    const dispatch = useDispatch();

     //user is an object of the form:
    //{
    //  id: 1,
    //  name: Alice Walker,
    //  username: awalker92,
    //  password: *hashed and salted*,
    //  is_admin: true,
    //  email: alice.walker@example.com,
    //  phone_number: 123-456-7890,
    //  birthdate: 01/02/2003,
    //  is_pitcher: true,
    //  hitting_skill: 2,
    //  fielding_skill: 1,
    //  liability_acknowledgment: Alice Walker,
    //  image: null
    //}
    const user = useSelector(store => store.user)
    // leagueOptions is an array of objects containing the difference leauge options
    // the objects are of the form:
    //{
    //  id: 1,
    //  name: Silver,
    //  day: Tuesday 
    //}
    const leagueOptions = useSelector(store => store.leagueOptions)
    // registrationTypes is an array of object containing the ways a user can register to play
    // the objects are of the form: {id: 1, type: individual}
    const registrationTypes = useSelector(store => store.registrationTypes) 
    // The userLeagueType is an array of objects containing the leauges a user is currently registered for
    // the objects are of the form: 
    //{
    //   id: 1,
    //  user_id: 1,
    //  league_id: 1,
    //  type_id: 2,
    //  is_captain: true,
    //  small_group_input: Anna and Becca,
    //  team_name_input: Chaos
    //}
    const userLeagueType = useSelector(store => store.userLeagueType)
    
    const [silver, setSilver] = useState(false)
    const [bronze, setBronze] = useState(false)
    const [silverRegistrationType, setSilverRegistrationType] = useState('1')
    const [bronzeRegistrationType, setBronzeRegistrationType] = useState('1')
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
        //dispatch to the leagueOptions saga
        dispatch({
            type: 'GET_REGISTRATION_TYPES'
        })
        //if the userLeagueType reducer has something in the array
        if (userLeagueType.length > 0) {
            console.log('userLeagueType is populated')
            // loop through the userLeagueType array
            for (let league of userLeagueType) {
                // if the league_id is 1 (Silver)
                if(league.league_id === '1') {
                    //set all the inputs to the values in the league object
                    setSilver(true);
                    setSilverRegistrationType(league.type_id);
                    setSilverSmallGroup(league.small_group_input)
                    setSilverTeam(league.team_name_input)
                    // console.log(league.is_captain)
                    setSilverCaptain(league.is_captain === true ? 'true' : 'false')
                }
                // if the league_id is 2 (Bronze)
                if(league.league_id === '2') {
                    //set all the inputs to the values in the league object
                    setBronze(true);
                    setBronzeRegistrationType(league.type_id);
                    setBronzeSmallGroup(league.small_group_input)
                    setBronzeTeam(league.team_name_input)
                    // console.log(league.is_captain)
                    setBronzeCaptain(league.is_captain === true ? 'true' : 'false')
                }
            }
        }


    }, []);

    //When the next button is clicked
    const nextPage = () => {
        //create an empty array to store the league registration information
        let leagueRegistration = []

        //if the silver league is selected for registration
        if(silver === true) {
            //store registration information in an object
            let silverLeagueRegistration = {
                league_id: leagueOptions[0].id,
                type_id: Number(silverRegistrationType),
                small_group_input: silverSmallGroup,
                team_input: silverTeam,
                is_captain: silverCaptain,
                user_id: user.id
            }
            // add the object to the league registration array
            leagueRegistration.push(silverLeagueRegistration)
            // console.log('silver league registration submitted: ', silverLeagueRegistration)
            
        }
        //if the bronze league is selected for registration
        if(bronze === true) {
            //store the registration information in an object
            let bronzeLeagueRegistration = {
                league_id: leagueOptions[1].id,
                type_id: Number(bronzeRegistrationType),
                small_group_input: bronzeSmallGroup,
                team_input: bronzeTeam,
                is_captain: bronzeCaptain,
                user_id: user.id
            }
            //add the object to the league registration array
            leagueRegistration.push(bronzeLeagueRegistration)
            // console.log('bronze league registration submitted: ', bronzeLeagueRegistration)
        }
        //dispatch the registration array to the playerRegistration saga
        dispatch({
            type: 'LEAGUE_REGISTRATION',
            payload: leagueRegistration
        })
        // go the next page
        history.push('/register_to_play/skill_and_experience')
    }

    //when the back button is clicked
    const backPage = () => {
        //go to the previous page
        history.push('/register_to_play/player_information')
    }

    //toggle between checked an unchecked when Silver checkbox is clicked
    const checkSilver = () => {
        setSilver(!silver);  
    }

    //toggle between checked an unchecked when Bronze checkbox is clicked
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
                        {/* when the leagueOptions reducer is populated render the league options on the dom */}
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
                {/* if a user selects silver league to register, render the registration types on the dom */}
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
                                        value={type.id}
                                        
                                    >
                                    {type.type}
                                    </option>
                                )
                            })}
                            
                        </select>
                    </div>
                    {/* if a user slects 'small group' as a registration type, render the small group input on the dom */}
                    {silverRegistrationType === '2' &&
                    <div>
                        <label htmlFor='smallGroup'> If you chose "small group", put the names of the palyers with which you are registering below.</label>
                        <input 
                            id='smallGroup'
                            value={silverSmallGroup}
                            onChange={(e) => setSilverSmallGroup(e.target.value)}
                        />
                    </div>}
                     {/* if a user slects 'team' as a registration type, render the team input on the dom */}
                    {silverRegistrationType === '3' &&
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
                                    checked={silverCaptain === 'true' ? true : false}
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
                                    checked={silverCaptain === 'false' ? true : false}
                                    onChange={(e) => setSilverCaptain(e.target.value)}
                                />
                                <label htmlFor='noSilverCaptain'>no</label>
                            </span>
                        </div>
                    </div>
                </div> }
                {/* if a user selects bronze league to register, render the registration types on the dom */}
                {bronze &&
                <div className='bronze-league'>
                    <h4>For {leagueOptions[1].name} League</h4>
                    <div>
                        <label htmlFor='type'>How are you registering to play?</label>
                        <select name='type' id='type' onChange={(e) => setBronzeRegistrationType(e.target.value)}>
                            {registrationTypes.map((type) => {
                                return (
                                    <option key={type.id} value={type.id}>{type.type}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* if a user slects 'small group' as a registration type, render the small group input on the dom */}
                    {bronzeRegistrationType === '2' &&
                    <div>
                        <label htmlFor='smallGroup'> If you chose "small group", put the names of the palyers with which you are registering below.</label>
                        <input 
                            id='smallGroup'
                            value={bronzeSmallGroup}
                            onChange={(e) => setBronzeSmallGroup(e.target.value)}
                        />
                    </div>}
                    {/* if a user slects  team' as a registration type, render the team input on the dom */}
                    {bronzeRegistrationType === '3' &&
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
                                    value = 'true'
                                    checked={bronzeCaptain === 'true' ? true : false}
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
                                    checked={bronzeCaptain === 'false' ? true : false}
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