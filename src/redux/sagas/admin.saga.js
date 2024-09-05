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
    // console.log('in updatePlayerData saga and the payload is: ', action.payload)
    let playerChangeInfo = action.payload;
    //Check the playerChangeInfo.user_team_id to see if the user is already associated with a 
    //team. 
    if (playerChangeInfo.user_team_id === null) {
        console.log('in changePlayerteam and playerChangeInfo.user_team_id was NULL')
        if (playerChangeInfo.team === 'DELETE') {
            //do nothing
        }
        else {
           //If the playerChangeInfo.user_team_id = null, then do  POST route with 
            //the PlayerChangeInfo.user-id and PlayerChangeInfo.team name. 
            try {
                yield axios.post('/api/admin/playerteam', {playerId: playerChangeInfo.user_id, team: playerChangeInfo.team})
            } catch (error) {
                console.log('error in post route in changePlayerTeam saga: ', error);
            }
        }
    }
    else {
        console.log('in changePlayerteam and playerChangeInfo.user_team_id was NOT NULL')
    }

    

    //If the playerChangeInfo.user_team_id != null, then check
    //playerChangeInfo.team

    //If the length of playerChangeInfo.team = 0, then do a DELETE 
    //route with the playerChangeInfo.user_team_id

    //If the length of playerChangeInfo.team != 0, then do a PUT route
    // with the playerChangeInfo.user_team_id and 
    // make a get request to the server looking for a row in user_team table
    //yield axios.get(`/api/giphy?q=${action.payload}`);
            // try {
            //    const response = yield axios.get(`/api/admin/playerteam`, {params: {userId: action.payload.user_id, league: action.payload.league_id}})
            //    //response will have team id if it exists
            //    console.log('in changePlayerTeam and server response is: ', response);
            // }
    // 1. if response is true (the selected player exists on a team) and 
    //    action.payload.team is true (the admin user entered text in the team field)
    //    then do a put route with the action.payload.team

    // 2. if response is true and action.payload.team is false
    //    then do a DELETE route with user_id and team_id

    // 3. if response is false and action.paylaod.team is true
    //    then do a POST route with user id and team id
    //    look at matt's example for this to capture the team id.

    // try {
    //     yield axios.put(`/api/admin`, action.payload)
    // } 
}

function* adminSaga() {
    yield takeLatest('GET_LEAGUE_DATA', leagueData);
    yield takeLatest('CHANGE_PLAYER_TEAM', changePlayerTeam);
  }

  export default adminSaga;
