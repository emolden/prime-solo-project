import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//leagueData sends a GET request to the admin route
function* leagueData (action) {
    console.log('in leagueData saga function')
    try{
        const response = yield axios.get(`/api/admin/leaguedata`);
        // console.log('response data from GET /api/admin in the leagueData saga is: ', response);
        yield put({ type: 'SET_LEAGUE_DATA', payload: response.data.leagueData });
        yield put({ type: 'SET_TEAM_DATA', payload: response.data.teamData})
    }catch(error) {
        console.log('leagueData had an error: ', error)
    }
}
// updatePlayerData sends a PUT request to the admin route
function* changePlayerTeam (action) {
    console.log('in updatePlayerData saga and the payload is: ', action.payload)
    // make a get request to the server looking for a row in user_team table
    try {
       const response = yield axios.get(`/api/adim/playerteam`, {params: {userId: action.payload.user_id, teamName: action.paylaod.team}})
    }
    // try {
    //     yield axios.put(`/api/admin`, action.payload)
    // } 
    catch (error) {
        console.log('updatePlayerData had an error: ', error);
    }
}

function* adminSaga() {
    yield takeLatest('GET_LEAGUE_DATA', leagueData);
    yield takeLatest('CHANGE_PLAYER_TEAM', changePlayerTeam);
  }

  export default adminSaga;
