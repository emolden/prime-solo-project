const leagueDataReducer = (state = [], action) => {
    // console.log('action payload is ',action.payload)
  switch (action.type) {
    case 'SET_LEAGUE_DATA':
      return action.payload;

    default:
      return state;
  }
};

// leagueData will be on the redux state at:
// state.leagueData
export default leagueDataReducer;