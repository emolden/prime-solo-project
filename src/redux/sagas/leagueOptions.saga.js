import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* leagueOptions (action) {

    
}

function* leagueOptionsSaga () {
    yield takeLatest('GET_LEAGUE_OPTIONS', leagueOptions)
}

export default leagueOptionsSaga