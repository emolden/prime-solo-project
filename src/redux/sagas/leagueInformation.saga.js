import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//will send an axios GET request to the server using the /api/league_information/league_options
function* leagueOptions (action) {
    // console.log('inside the league options saga!!!')
    try {
        const leagueResults = yield axios.get('/api/league_information/league_options')

        // console.log('response from /api/league_information/legue_options: ', leagueResults)
        yield put({
            type: 'SET_LEAGUE_OPTIONS',
            payload: leagueResults.data
        })
    }
    catch (error) {
        console.log('there was an error in the leagueOptions saga: ', error);
    }
    
}

//will send an axios GET request to the server using the /api/league_information/registration_types
function* registrationTypes (action) {
    // console.log('inside the registration types saga!!!')
    try {
        const typeResults = yield axios.get('/api/league_information/registration_types')

        // console.log('response from /api/league_information/registration_types: ', typeResults)
        yield put({
            type: 'SET_REGISTRATION_TYPES',
            payload: typeResults.data
        })
    }
    catch (error) {
        console.log('there was an error in the leagueOptions saga: ', error);
    }
}

function* leagueInformationSaga () {
    yield takeLatest('GET_LEAGUE_OPTIONS', leagueOptions)
    yield takeLatest('GET_REGISTRATION_TYPES', registrationTypes)
}

export default leagueInformationSaga