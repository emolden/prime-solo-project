import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* leagueData (action) {
    console.log('in leagueData saga function')
    try{
        const response = yield axios.get(`/api/admin`);
    }catch(error) {
        console.log('leagueData had an error: ', error)
    }
}

function* adminSaga() {
    yield takeLatest('GET_LEAGUE_DATA', leagueData);
  }

  export default adminSaga;
