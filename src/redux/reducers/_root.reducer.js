import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import leagueData from './leagueData.reducer';
import teamData from './teamData.reducer';
import leagueOptions from './leagueOptions.reducer';
import registrationTypes from './registrationTypes.reducer';
import userLeagueType from './user_league_type.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  leagueData, //will have an array of objects containing data on all players when an admin is logged in
  teamData,//will be an array of objects containing team name, and team id
  leagueOptions, // will be an array of objects containing the league name, day of the week, and id
  registrationTypes, //will be an array of objects containing the id and type
  userLeagueType, //will be an array of objects containing the user id, league id, type id, small group input, team input
});

export default rootReducer;
