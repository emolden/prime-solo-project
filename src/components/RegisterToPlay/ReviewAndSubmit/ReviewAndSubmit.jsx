


function ReviewAndSubmit () {

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
                <ol>
                    <li>Liability Acknowledgment</li>
                    <li>
                        <p>Player Information</p>
                        <ul>
                            <li>Name:</li>
                            <li>Email:</li>
                            <li>Phone Number:</li>
                            <li>Birthdate:</li>
                        </ul>
                    </li>
                    <li>
                        <p>Registration Type</p>
                        <ul>
                            <li>League:</li>
                            <li>Registration Type: </li>
                            <li>Willing to be team manager:</li>
                        </ul>
                    </li>
                    <li>
                        <p>Skill & Experience</p>
                        <ul>
                            <li>Hitting Skill:</li>
                            <li>Fielding Skill:</li>
                            <li>Position Preference:</li>
                            <li>Able to Pitch:</li>
                        </ul>
                    </li>
                </ol>
            </section>
            <section className='back-next-buttons'>
                <button>BACK</button>
                <button>SUBMIT</button>
            </section>
        </div>
    )
}

export default ReviewAndSubmit