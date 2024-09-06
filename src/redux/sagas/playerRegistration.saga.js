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
        console.log('there was an error liabilityAcknowledgment POST route: ', error);
    }
}

function* playerRegistrationSaga() {
    yield takeLatest('UPDATE_LIABILITY_ACKNOWLEDGMENT', liabilityAcknowledgment);
}

export default playerRegistrationSaga