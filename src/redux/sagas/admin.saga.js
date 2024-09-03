import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//leagueData sends a GET request to the admin route
function* leagueData (action) {
    console.log('in leagueData saga function')
    try{
        const response = yield axios.get(`/api/admin`);
        // console.log('response data from GET /api/admin in the leagueData saga is: ', response);
        yield put({ type: 'SET_LEAGUE_DATA', payload: response.data });
    }catch(error) {
        console.log('leagueData had an error: ', error)
    }
}

function* updatePlayerData (action) {
    console.log('in updatePlayerData saga and the payload is: ', action.payload)
}

function* adminSaga() {
    yield takeLatest('GET_LEAGUE_DATA', leagueData);
    yield takeLatest('UPDATE_PLAYER_DATA', updatePlayerData);
  }

  export default adminSaga;
