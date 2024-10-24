import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import convertISOtoDisplayable from '../../../Helpers/dateFormatter';


//?????????????????????data validation????????????????????

function PlayerInformation () {

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

    // ??????????????????? 🔥Do I need useState? Should I update the reducer onChange? ????????????????????????????????
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthdate, setBirthdate] = useState('')

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhoneNumber(user.phone_number);
        setBirthdate(convertISOtoDisplayable(user.birthdate));
    }, []);

    const autoPopulate = () => {
        setName('Ella Martinez')
        setEmail('emartinez@example.com')
        setPhoneNumber('123-456-7890')
        setBirthdate('01/02/2003')
    }

    const nextPage = () => {
        //dispatch to the playerRegistration reducer
        dispatch({
            type: 'UPDATE_PLAYER_INFORMATION',
            payload: {
                user_id: user.id,
                username: user.username,
                name: name,
                email: email,
                phone_number: phoneNumber,
                birthdate: birthdate
            }
        })
        // go to next page
        history.push('/register_to_play/registration_type')
    }

    const backPage = () => {
        //go to previous page
        history.push('/register_to_play/liability_acknowledgment')
    }

    return (
        <div>
            {/*  🦄 REFACTOR
                    current Register To Play page is bolded & 
                    past pages are checked green 
            */}
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
            {/*  🦄 */}
            <section className='registration-form'>
                <h3 onClick={autoPopulate}>Player Information</h3>
                <form className='player-form'>
                    <label htmlFor="name">
                        Name:
                        <input 
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            value={name}
                            placeholder='first last'
                        />
                    </label>
                    <label htmlFor="email">
                        Email:
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            value={email}
                        />
                    </label>
                    <label htmlFor="phone">
                        Phone Number:
                        <input 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            id="phone"
                            value={phoneNumber}
                            placeholder= '### - ### - ####'
                        />
                    </label>
                    <label htmlFor="birthdate">
                        Birthdate:
                        <input 
                            onChange={(e) => setBirthdate(e.target.value)}
                            id="birthdate"
                            value={birthdate}
                            placeholder='MM/DD/YYYY'
                        />
                    </label>
                </form>
            </section>
            <section className='back-next-buttons'>
                {/* 👻 REFACTOR
                        next & back button as helper function
                */}
                <button className="btn" onClick={backPage}>BACK</button>
                <button className="btn" onClick={nextPage}>NEXT</button>
            </section>
        </div>
    )
}

export default PlayerInformation