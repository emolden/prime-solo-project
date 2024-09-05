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
                
                yield put({
                    type: 'GET_LEAGUE_DATA'
                })
            } catch (error) {
                console.log('error in post route in changePlayerTeam saga: ', error);
            }
        }
    }
    else {
        //If the playerChangeInfo.user_team_id != null, then check
        //playerChangeInfo.team
        // console.log('in changePlayerteam and playerChangeInfo.user_team_id was NOT NULL')
        if (playerChangeInfo.team === 'DELETE') {
            //If playerChangeInfo.team = DELETE, then do a DELETE 
            //route with the playerChangeInfo.user_team_id
            try {
                yield axios.delete(`/api/admin/playerteam/${playerChangeInfo.user_team_id}`)

                yield put({
                    type: 'GET_LEAGUE_DATA'
                })
            } catch (error) {
                console.log('error in delete route in changePlayerTeam saga: ', error);
            }
        }
        else {
            //If the length of playerChangeInfo.team != 0, then do a PUT route
            // with the playerChangeInfo.user_team_id and 
            // make a get request to the server looking for a row in user_team table
            try {
                yield axios.put(`/api/admin/playerteam/${playerChangeInfo.user_team_id}`, {team: playerChangeInfo.team})
            
                yield put({
                    type: 'GET_LEAGUE_DATA'
                })
            } catch (error) {
                console.log('error in put route in changePlayerTeam saga: ', error)
            }
        }
    }
}

function* adminSaga() {
    yield takeLatest('GET_LEAGUE_DATA', leagueData);
    yield takeLatest('CHANGE_PLAYER_TEAM', changePlayerTeam);
  }

  export default adminSaga;
