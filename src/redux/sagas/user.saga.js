import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

//fetches the registration information after the user registers for a league
function* fetchUserLeagueType (action) {
  // console.log('fetchUserLeaugeType', action.payload)
  try {
    // sends get request to the user router
    const response = yield axios.get(`/api/user/leauge_type/${action.payload}`)

    // console.log('response from the server in api/user/leauge_type: ', response.data)
    //send registration information to the user_league_type reducer
    yield put ({ type: 'SET_USER_LEAGUE_TYPE', payload: response.data});

  } catch (error) {
    console.log('UserLeagueType GET request failed: ', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_LEAGUE_TYPE', fetchUserLeagueType)
}

export default userSaga;
