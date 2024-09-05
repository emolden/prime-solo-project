import LiabilityAcknowledgment from "./LiabilityAcknowledgment/LiabilityAcknowlegment.jsx";
import PlayerInformation from "./PlayerInformation/PlayerInformation";
import RegistrationType from "./RegistrationType/RegistrationType";
import SkillAndExperience from "./SkillAndExperience/SkillAndExperience";
import ReviewAndSubmit from "./ReviewAndSubmit/ReviewAndSubmit";
import './RegisterToPlay.css';

function RegisterToPlay ( ) {

    return (
        <div>
            <h1>Register To Play</h1>
            {/* <LiabilityAcknowledgment /> */}
            {/* <PlayerInformation /> */}
            <RegistrationType />
            {/* <SkillAndExperience />
            <ReviewAndSubmit /> */}
            
        </div>
    )
}

export default RegisterToPlay;