import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LiabilityAcknowledgment () {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user)

    //stores the user's signature input as they type
    // ??????????????????? 🔥Do I need useState? Should I update the reducer onChange? ????????????????????????????????
    const [signature, setSignature] = useState('')

    //useEffect sets the signature field to the conents from the database
    //if anything exists
    useEffect(() => {
        setSignature(user.liability_acknowledgment)
    }, []);

    //When the user clicks the button to go to the next page,
    //their signature will be sent to the softballRegistration reducer,
    //and they will be brought to the player information page.
    const nextPage = () => {

        dispatch({
            type: 'UPDATE_LIABILITY_ACKNOWLEDGMENT',
            payload: {
                liability_acknowledgment: signature,
                user_id: user.id
            }
        })

        history.push('/register_to_play/player_information')
    }

    const autoPopulate = () => {
        setSignature('Ella Martinez')
    }

    return (
        <div>
            {/*  🦄 REFACTOR 
                    current Register To Play page is bolded & 
                    past pages are checked green 
            */}
            <section className='registration-header'>
                <div className='registration-section' id='current-registration-section'>
                    <h6>1.</h6>
                    <div className='registration-section-title'>
                        <h6>Liability</h6>
                        <h6>Acknowledgment</h6>
                    </div>
                </div>
                <div className='registration-section'>
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
            {/*  🦄  */}
            <section className='registration-form'>
                <h3 onClick={autoPopulate}>Liability Acknowledgment</h3>
                ------
                <h5>
                    Photo/Video Consent
                </h5>
                <p>
                    West Metro Softball frequently takes photos and/or videos at games, 
                    tournaments, and other activities. These images/videos may be used by 
                    WMS to share news about and publicize the league. I understand and consent 
                    to images/videos that include the above-named player being used in press 
                    releases, printed publicity, and published on WMS’s website and Facebook 
                    and other social media pages.  If you would prefer for you or the above-named 
                    player not to be included in any such photograph or video, please contact 
                    Jessie Erickson, WMS Co-President and Communications Manager, at 
                    westmetrosoftball@gmail.com.
                </p>
                ------
                <h5>
                    Waiver of Liability and Assumption of Risk Agreement
                </h5>
                <p>
                    I am the above-named player. I agree that I will comply with any and all 
                    rules and requirements of West Metro Softball, the City of New Hope and any 
                    public health or other authority, including but not limited to those 
                    pertaining to COVID-19.
                </p>
                <p>
                    I assume all risks and hazards incidental to participation in WMS, including the 
                    potential for serious injury, illness, or death. This includes the risk of being 
                    in contact with, exposed to, or close proximity to, individuals who have been 
                    exposed to and/or diagnosed with COVID-19 or any other communicable disease or 
                    medical condition. I understand that I could become infected with COVID-19 or any 
                    other disease or medical condition and that it is impossible to eliminate such 
                    risk. If I am diagnosed with COVID-19, I will promptly inform a member of the 
                    West Metro Softball Board via email at westmetrosoftball@gmail.com.
                </p>
                <p>
                    By participating in WMS activities, I knowingly and freely assume all risks, both 
                    known and unknown, even if arising from negligence, and assume full responsibility 
                    for my participation. On behalf of myself and my heirs, assigns, personal 
                    representatives, next of kin, and any family member, guest, or spectator that I 
                    invite to or have attend any WMS activities, I hereby waive and release and agree 
                    to defend, indemnify and hold harmless WMS, the City of New Hope, and each of 
                    their officers, Board members, insurers, agents, representatives, employees, 
                    volunteers, participants, organizers, sponsors, and persons transporting myself 
                    to and from activities, from and against any and all claims that may arise out 
                    of my participation in WMS activities.  I understand and agree that this includes, 
                    but is not limited to, all claims with respect to any injury, illness, disability, 
                    death, or loss of or damage to person or property, whether the result of negligence 
                    or any other cause.
                </p>
                <p>
                    I hereby give my consent for any medical treatment as deemed necessary by medical 
                    professionals in case of illness or injury incurred while participating in WMS 
                    activities. I understand that the policy of WMS is to call 911 in case of serious 
                    injury or illness and that the responding medical team will determine further 
                    treatment or transportation. I understand that this is to prevent undue delay and 
                    assure proper treatment and that my listed emergency contact be notified as soon 
                    as possible in case of serious injury or illness.
                </p>
                <h5>
                    By signing my name below electronically, I assume all liability and responsibility in participating in West Metro Softball.
                </h5>
                <input
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder= 'sign here'
                    value={signature}
                />
            </section>
            <section className='next-button'>
                {/* 👻 REFACTOR
                        next & back button as helper function
                */}
                <button className="btn" onClick = {nextPage}>NEXT</button>
            </section>
        </div>
    )
}

export default LiabilityAcknowledgment