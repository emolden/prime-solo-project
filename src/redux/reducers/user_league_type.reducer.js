const userLeagueTypeReducer = (state = [], action) => {
    console.log('in userLeaugeType reducer: ', action.payload)

    switch (action.type) {
        case 'SET_USER_LEAGUE_TYPE':
            return action.payload;
        
        default:
            return state;
    }
}

// userLeagueType will be on the redux state at:
// state.userLeaugeType
export default userLeagueTypeReducer;