
//leagueOptions will be an array of objects of the form:
// {id: 1, league: Silver, day: Tuesday}
const leagueOptionsReducer = (state = [], action) => {
    console.log('leagueOptionsReducer is updating state');
    switch (action.type) {
        case 'SET_LEAGUE_OPTIONS':
            return action.payload;

        default:
            return state;
    }
}

// leagueOptions will be on the redux state at:
// state.leagueOptions
export default leagueOptionsReducer