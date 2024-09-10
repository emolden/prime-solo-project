import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//????????????????????Data validation???????????????????????
//???????????GET position prefrences from database??????????
function SkillAndExperience () {

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
    // userPosition is an object of the form: {id: 1, user_id: 5, position_id: 2}
    const userPosition = useSelector(store => store.userPosition)

    const[hittingSkill, setHittingSkill] = useState('')
    const[fieldingSkill, setFieldingSkill] = useState('')
    const[position, setPosition] = useState('')
    const[pitcher, setPitcher] = useState('')

    useEffect(() => {
        if(user.hitting_skill) {
            setHittingSkill(user.hitting_skill)
        }
        if(user.fielding_skill) {
            setFieldingSkill(user.fielding_skill)
            setPitcher(user.is_pitcher === true ? 'true' : 'false')
        }
        if(userPosition.position_id) {
            setPosition(userPosition.position_id)
        }
    }, [])

    const nextPage = () => {
        // console.log(hittingSkill, fieldingSkill, position, pitcher);
        //sends a dispatch to playerRegistration saga
        dispatch({
            type: 'UPDATE_SKILL_AND_EXPEREINCE',
            payload: {
                user_id: user.id,
                hitting_skill: hittingSkill,
                fielding_skill: fieldingSkill,
                position_id: position,
                is_pitcher: pitcher
            }
        })
        history.push('/register_to_play/review_and_submit')
    }

    const backPage = () => {
        history.push('/register_to_play/registration_type')
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
                <div className='registration-section' id='current-registration-section'>
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
                <h3>Skill & Experience</h3>
                <div className='skill-question'>
                    <p>Please rate your hitting skill:</p>
                    <div className='skill-options'>
                        <span className= 'skill-input'>
                            <input
                                type='radio'
                                id='beginnerHitter'
                                name='hittingSkill'
                                value = '1'
                                checked={hittingSkill === '1' ? true : false}
                                onChange={(e) => setHittingSkill(e.target.value)}
                            />
                            <label htmlFor='beginnerHitter'> Beginner - Learning to make contact, if contact is made it's likely hit to the infield.</label>
                        </span>
                        <span className= 'skill-input'>
                            <input
                                type='radio'
                                id='developingHitter'
                                name='hittingSkill'
                                value = '2'
                                checked={hittingSkill === '2' ? true : false}
                                onChange={(e) => setHittingSkill(e.target.value)}
                            />
                            <label htmlFor='developingHitter'> Developing - Makes contact most of the time. Infield hits are common and occasional outfield hit.</label>
                        </span>
                        <span className= 'skill-input'>
                            <input
                                type='radio'
                                id='intermediateHitter'
                                name='hittingSkill'
                                value = '3'
                                checked={hittingSkill === '3' ? true : false}
                                onChange={(e) => setHittingSkill(e.target.value)}
                            />
                            <label htmlFor='intermediateHitter'> Intermediate - Hits hard ground/fly balls. Occasional big hit.</label>
                        </span>
                        <span className= 'skill-input'>
                            <input
                                type='radio'
                                id='advancedHitter'
                                name='hittingSkill'
                                value = '4'
                                checked={hittingSkill === '4' ? true : false}
                                onChange={(e) => setHittingSkill(e.target.value)}
                            />
                            <label htmlFor='advancedHitter'> Advanced - Power hitter, deep fly balls, and occasional homerun.</label>
                        </span>
                    </div>
                </div>
                <div className='skill-question'>
                    <p>Please rate your fielding skill:</p>
                    <div className='skill-options'>
                        <span>
                            <input
                                type='radio'
                                id='beginnerFielder'
                                name='fieldingSkill'
                                value = '1'
                                checked={fieldingSkill === '1' ? true : false}
                                onChange={(e) => setFieldingSkill(e.target.value)}
                            />
                            <label htmlFor='beginnerFielder'> Beginner - Learning positions and fielding/throwing skills.</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='developingFielder'
                                name='fieldingSkill'
                                value = '2'
                                checked={fieldingSkill === '2' ? true : false}
                                onChange={(e) => setFieldingSkill(e.target.value)}
                            />
                            <label htmlFor='developingFielder'> Developing - Comfortable in basic positions and developing reliable fielding/throwing skills.</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='intermediateFielder'
                                name='fieldingSkill'
                                value = '3'
                                checked={fieldingSkill === '3' ? true : false}
                                onChange={(e) => setFieldingSkill(e.target.value)}
                            />
                            <label htmlFor='intermediateFielder'> Intermediate - Can play all poisitions comfortable, accurate throw, and reliable skill.</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='advancedFielder'
                                name='fieldingSkill'
                                value = '4'
                                checked={fieldingSkill === '4' ? true : false}
                                onChange={(e) => setFieldingSkill(e.target.value)}
                            />
                            <label htmlFor='advancedFielder'> Advanced - Strong and accurate throw, reliale in all positions, and can lead aspects of gameplay.</label>
                        </span>
                    </div>
                </div>
                <div>
                    <p>Please select your position preference:</p>
                    <div className='skill-options'>
                        <span>
                            <input
                                type='radio'
                                id='infield'
                                name='position'
                                value= '1'
                                checked={position === '1' ? true : false}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                            <label htmlFor='infield'>Infield</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='outfield'
                                name='position'
                                value='2'
                                checked={position === '2' ? true : false}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                            <label htmlFor='outfield'>Outfield</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='infieldOrOutfield'
                                name='position'
                                value='3'
                                checked={position === '3' ? true : false}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                            <label htmlFor='infieldOrOutfield'>Infield or Outfield</label>
                        </span>
                    </div>
                </div>
                <div>
                    <p>Are you able/willing to pictch in a game?</p>
                    <div className='skill-options'>
                        <span>
                            <input
                                type='radio'
                                id='yes'
                                name='pitcher'
                                value='true'
                                checked={pitcher === 'true' ? true : false}
                                onChange={(e) => setPitcher(e.target.value)}
                            />
                            <label htmlFor='yes'>Yes</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='no'
                                name='pitcher'
                                value='false'
                                checked={pitcher === 'false' ? true : false}
                                onChange={(e) => setPitcher(e.target.value)}
                            />
                            <label htmlFor='no'>No</label>
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

export default SkillAndExperience