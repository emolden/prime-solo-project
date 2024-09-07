import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//will send an axios GET request to the server using the /api/
function* leagueOptions (action) {
    // console.log('inside the league options saga!!!')
    try {
        const leagueResults = yield axios.get('/api/league_information/league_options')

        console.log('response from /api/league_information/legue_options: ', leagueResults)
    }
    catch (error) {
        console.log('there was an error in the leagueOptions saga: ', error);
    }
    
}

function* leagueInformationSaga () {
    yield takeLatest('GET_LEAGUE_OPTIONS', leagueOptions)
}

export default leagueInformationSaga