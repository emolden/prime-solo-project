// userPosition reducer is an array of objects containing the
// position preferences for the user registering to play

const userPositionReducer = (state = {}, action) => {
    // console.log('in userPosition reducer:', action.payload)

    switch (action.type) {
        case 'SET_USER_POSITION':
            return action.payload[0];
        
        default:
            return state;
    }
}

// userPosition will be int he redux state at:
// state.userPosition
export default userPositionReducer;