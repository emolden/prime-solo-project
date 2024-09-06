import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* liabilityAcknowledgment (action) {
    console.log('in liabilityAcknowledgment saga function')
    try {
        yield axios.put('/api/player_registration/liability_acknowledgment', action.payload)

        // yield put ({
        //     type: 'SET_LIABILITY_ACKNOWLEDGMENT'
        // })
    } catch (error) {
        console.log('there was an error liabilityAcknowledgment POST route: ', error);
    }
}

function* playerRegistrationSaga() {
    yield takeLatest('UPDATE_LIABILITY_ACKNOWLEDGMENT', liabilityAcknowledgment);
}

export default playerRegistrationSaga