import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* leaugeData () {
    
}

function* adminSaga() {
    yield takeLatest('GET_LEAGUE_DATA', leagueData);
  }

  export default adminSaga;
