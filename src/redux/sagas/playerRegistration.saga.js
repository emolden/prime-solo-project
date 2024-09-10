import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//send the liability acknowledgment data to the database and fetch updated data
function* liabilityAcknowledgment (action) {
    // console.log('in liabilityAcknowledgment saga function')
    try {
        //PUT request sends the signature and user id 
        yield axios.put('/api/player_registration/liability_acknowledgment', action.payload)

        // FETCH_USER is in the user.saga which sends a GET request 
        yield put ({
            type: 'FETCH_USER'
        })
    } catch (error) {
        console.log('there was an error in the liabilityAcknowledgment PUT route: ', error);
    }
}

//send the player information data to the database and fetch updated data
function* playerInformation (action) {
    // console.log('in playerInformation saga function')
    try {
        //PUT request sends the user id, name, email, phone number, and birthdate
        yield axios.put('/api/player_registration/player_information', action.payload)

        yield put ({
            type: 'FETCH_USER'
        })
    } catch (error) {
        console.log('there was an error in the playerInfomation PUT route: ', error)
    }
}

//send the league registration data to the database and fetch updated data
function* leagueRegistration (action) {
    // console.log('dispatch to silverTeamRegistration saga: ', action.payload)
    try {
        //POST request sends the user id, league_id, small_group_input, team_name_input, is_captain, and type_id
        yield axios.post('/api/player_registration/league_registration', action.payload)

        yield put ({
            type: 'FETCH_USER_LEAGUE_TYPE',
            payload: action.payload[0].user_id
        })
    } catch (error) {
        console.log('there was an error in the silveLeagueRegistration POST route: ', error)
    }
}

// send the skill and experience data to the database and fetch updated data
function* skillAndExperience (action) {
    try {
        //PUT request sends the user_id, hitting_skill, fielding_skill, position_id, and is_pitcher
        yield axios.put('/api/player_registration/skill_and_experience', action.payload)

        // yield put ({
        //     type: 'FETCH_USER'
        // })
    } catch (error) {
        console.log('there was an error in the playerInfomation PUT route: ', error)
    }
}

function* playerRegistrationSaga() {
    yield takeLatest('UPDATE_LIABILITY_ACKNOWLEDGMENT', liabilityAcknowledgment);
    yield takeLatest('UPDATE_PLAYER_INFORMATION', playerInformation);
    yield takeLatest('LEAGUE_REGISTRATION', leagueRegistration);
    yield takeLatest('UPDATE_SKILL_AND_EXPEREINCE', skillAndExperience);
}

export default playerRegistrationSaga