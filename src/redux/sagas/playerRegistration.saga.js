import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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

function* LeagueRegistration (action) {
    // console.log('dispatch to silverTeamRegistration saga: ', action.payload)
    try {
        //POST request sends the user id, league_id, small_group_input, team_name_input, is_captain, and type_id
        yield axios.post('/api/player_registration/league_registration', action.payload)

        yield put ({
            type: 'FETCH_USER_LEAGUE_TYPE',
            payload: action.payload.user_id
        })
    } catch (error) {
        console.log('there was an error in the silveLeagueRegistration POST route: ', error)
    }
}

function* bronzeLeagueRegistration (action) {
    // console.log('dispatch to bronzeTeamRegistration saga: ', action.payload)
    try {
        //POST request sends the user id, league_id, small_group_input, team_name_input, is_captain, and type_id
        yield axios.post('/api/player_registration/bronze_league_registration', action.payload)

        yield put ({
            type: 'FETCH_USER_LEAGUE_TYPE',
            payload: action.payload.user_id
        })
    } catch (error) {
        console.log('there was an error in the bronzeLeagueRegistration POST route: ', error)
    }
}

function* playerRegistrationSaga() {
    yield takeLatest('UPDATE_LIABILITY_ACKNOWLEDGMENT', liabilityAcknowledgment);
    yield takeLatest('UPDATE_PLAYER_INFORMATION', playerInformation);
    yield takeLatest('LEAGUE_REGISTRATION', LeagueRegistration);
    yield takeLatest('BRONZE_LEAGUE_REGISTRATION', bronzeLeagueRegistration);
}

export default playerRegistrationSaga