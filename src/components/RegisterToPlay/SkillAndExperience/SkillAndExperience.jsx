import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useState } from 'react';

// 
function SkillAndExperience () {

    const history = useHistory();

    const[hittingSkill, setHittingSkill] = useState('')

    const nextPage = () => {
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
                            <label htmlFor='beginnerHitter'> Beginner - Learning to make contact, if contact is made it's likely hit to the infield</label>
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
                            <label htmlFor='beginnerFielder'> Beginner - Learning positions and fielding/throwing skills</label>
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
                            <label htmlFor='developingFielder'> Developing - Comfortable in basic positions and developing reliable fielding/trhowing skills.</label>
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
                                name='infield'
                                value='infield'
                            />
                            <label htmlFor='infield'>Infield</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='outfield'
                                name='outfield'
                                value='outfield'
                            />
                            <label htmlFor='outfield'>Outfield</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='infieldOrOutfield'
                                name='infieldOrOutfield'
                                value='infieldOrOutfield'
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
                                name='yes'
                                value='yes'
                            />
                            <label htmlFor='yes'>Yes</label>
                        </span>
                        <span>
                            <input
                                type='radio'
                                id='no'
                                name='no'
                                value='no'
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