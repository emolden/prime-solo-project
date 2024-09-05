const teamDataReducer = (state = [], action) => {
    console.log(' in teamDataReducer action payload is ',action.payload)
  switch (action.type) {
    case 'SET_TEAM_DATA':
      return action.payload;

    default:
      return state;
  }
};

// leagueData will be on the redux state at:
// state.leagueData
export default teamDataReducer;