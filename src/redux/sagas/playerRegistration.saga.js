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
        console.log('there was an error in the liabilityAcknowledgment POST route: ', error);
    }
}

function* playerInformation (action) {
    console.log('in playerInformation saga function')
    try {
        //PUT request sends the user id, name, email, phone number, and birthdate
        yield axios.put('/api/player_registration/player_information', action.payload)

        yield put ({
            type: 'FETCH_USER'
        })
    } catch (error) {
        console.log('there was an error in the playerInfomation POST route: ', error)
    }
}

function* silverTeamRegistration (action) {
    console.log('dispatch to silverTeamRegistration saga: ', action.payload)
}

function* bronzeTeamRegistration (action) {
    console.log('dispatch to bronzeTeamRegistration saga: ', action.payload)
}

function* playerRegistrationSaga() {
    yield takeLatest('UPDATE_LIABILITY_ACKNOWLEDGMENT', liabilityAcknowledgment);
    yield takeLatest('UPDATE_PLAYER_INFORMATION', playerInformation);
    yield takeLatest('SILVER_LEAUGE_REGISTRATION', silverTeamRegistration);
    yield takeLatest('BRONZE_LEAGUE_REGISTRATION', bronzeTeamRegistration);
}

export default playerRegistrationSaga