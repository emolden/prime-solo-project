import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';

function PlayerInformation () {

    const history = useHistory();

    const nextPage = () => {
        history.push('/register_to_play/registration_type')
    }

    const backPage = () => {
        history.push('/register_to_play/liability_acknowledgment')
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
                <div className='registration-section' id='current-registration-section'>
                    <h6>2.</h6>
                    <div className='registration-section-title'>
                        <h6>Player</h6>
                        <h6>Information</h6>
                    </div>
                </div>
                <div className='registration-section'>
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
                <h3>Player Information</h3>
                <form className='player-form'>
                    <label htmlFor="name">
                        Name:
                        <input 
                        id="name"
                        />
                    </label>
                    <label htmlFor="email">
                        Email:
                        <input 
                        id="email"
                        />
                    </label>
                    <label htmlFor="phone">
                        Phone Number:
                        <input 
                        id="phone"
                        />
                    </label>
                    <label htmlFor="birthday">
                        Birthdate:
                        <input 
                        id="birthday"
                        />
                    </label>
                </form>
            </section>
            <section className='back-next-buttons'>
                <button onClick={backPage}>BACK</button>
                <button onClick={nextPage}>NEXT</button>
            </section>
        </div>
    )
}

export default PlayerInformation