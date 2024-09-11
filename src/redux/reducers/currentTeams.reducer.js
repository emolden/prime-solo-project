

const currentTeamsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_TEAMS':
            return action.payload;
        
        default: 
            return state;
    }
}

// currentTeams will be on the redux state at:
// state.currentTeams
export default currentTeamsReducer;