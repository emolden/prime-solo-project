import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import convertISOtoDisplayable from '../../../Helpers/dateFormatter';


function ReviewAndSubmit () {

    const dispatch = useDispatch();
    const history = useHistory();
    
    //gather the data needed to render registration intomration on this page
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
    // userPosition is an object of the form: {id: 1, user_id: 5, position_id: 2}
    const userPosition = useSelector(store => store.userPosition)
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

    const submitRegistration = () => {
        Swal.fire({
            title: "You have successfully registered for West Metro Softball!",
            text: "Thank you for your patience as we put our teams together.",
            icon: "success"
          });
        
        history.push('/')
    }

    const backPage = () => {
        history.push('/register_to_play/skill_and_experience')
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
                <div className='registration-section' >
                    <h6>3.</h6>
                    <div className='registration-section-title'>
                        <h6>Registration</h6>
                        <h6>Type</h6>
                        <h6>✅</h6>
                    </div>
                </div>
                <div className='registration-section' >
                    <h6>4.</h6>
                    <div className='registration-section-title'>
                        <h6>Skill &</h6>
                        <h6>Experience</h6>
                        <h6>✅</h6>
                    </div>
                </div >
                <div className='registration-section' id='current-registration-section'>
                    <h6>5.</h6>
                    <div className='registration-section-title'>
                        <h6>Review &</h6>
                        <h6>Submit</h6>
                    </div>
                </div>
            </section>
            <section className='registration-form'>
                <h3>Review & Submit</h3>
                <p>Please review the information below. If it is correct, hit "SUBMIT".</p>
                <ol>
                    <li>Liability Acknowledgment: <span className="user-registration-info">{user.liability_acknowledgment}</span></li>
                    <li>
                        <p>Player Information</p>
                        <ul>
                            <li>Name: <span className="user-registration-info">{user.name}</span></li>
                            <li>Email: <span className="user-registration-info">{user.email}</span></li>
                            <li>Phone Number: <span className="user-registration-info">{user.phone_number}</span></li>
                            <li>Birthdate: <span className="user-registration-info">{convertISOtoDisplayable(user.birthdate)}</span></li>
                        </ul>
                    </li>
                    <li>
                        <p>Registration Type</p>
                            {userLeagueType.map((league) => {
                                return (
                                    <ul key={league.id}>
                                    <li>League: <span className="user-registration-info">{Number(league.league_id) === 1 ? 'Silver' : 'Bronze'}</span></li>
                                    <li>Registration Type: <span className="user-registration-info">{Number(league.type_id) === 1 && 'Individual'} 
                                                           {Number(league.type_id) === 2 && 'Small Group'}
                                                           {Number(league.type_id) === 3 && 'Team'}</span>
                                    </li>
                                    {Number(league.type_id) === 2 && <li>Small Group: <span className="user-registration-info">{league.small_group_input}</span></li>} 
                                    {Number(league.type_id) === 3 && <li>Team: <span className="user-registration-info">{league.team_name_input}</span></li> }       
                                    <li>Willing to be team manager: <span className="user-registration-info">{league.is_captian === true ? 'Yes' : 'No'}</span></li>
                                    </ul>
                                )
                            })}
                           
                    </li>
                    <li>
                        <p>Skill & Experience</p>
                        <ul>
                            <li>Hitting Skill:  <span className="user-registration-info">{Number(user.hitting_skill) === 1 && `Beginner - Learning to make contact, if contact is made it's likely hit to the infield.`} 
                                                {Number(user.hitting_skill) === 2 && 'Developing - Makes contact most of the time. Infield hits are common and occasional outfield hit.'}
                                                {Number(user.hitting_skill) === 3 && 'Intermediate - Hits hard ground/fly balls. Occasional big hit.'}
                                                {Number(user.hitting_skill) === 4 && 'Advanced - Power hitter, deep fly balls, and occasional homerun.'}</span>
                            </li>
                            <li>Fielding Skill: <span className="user-registration-info">{Number(user.fielding_skill) === 1 && 'Beginner - Learning positions and fielding/throwing skills.'}
                                                {Number(user.fielding_skill) === 2 && 'Developing - Comfortable in basic positions and developing reliable fielding/throwing skills.'}
                                                {Number(user.fielding_skill) === 3 && 'Intermediate - Can play all positions comfortably, accurate throw, and reliable skill.'}
                                                {Number(user.fielding_skill) === 4 && 'Advanced - Strong and accurate throw, reliable in all positions, and can lead aspects of gameplay.'}</span>
                            </li>
                            <li>Position Preference:<span className="user-registration-info">{Number(userPosition.position_id) === 1 && 'Infield'}
                                                    {Number(userPosition.position_id) === 2 && 'Outfield'}
                                                    {Number(userPosition.position_id) === 3 && 'Infield or Outfield'}</span>

                            </li>
                            <li>Able to Pitch:<span className="user-registration-info">{user.is_pitcher === true ? 'Yes' : 'No'}</span></li>
                        </ul>
                    </li>
                </ol>
            </section>
            <section className='back-next-buttons'>
                <button className="btn" onClick={backPage}>BACK</button>
                <button className="btn" onClick={submitRegistration}>SUBMIT</button>
            </section>
        </div>
    )
}

export default ReviewAndSubmit