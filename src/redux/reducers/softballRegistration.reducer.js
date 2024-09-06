const softballregistrationReducer = (state = {}, action) => {
    switch (action.type) {
        case `SET_USER_REGISTERING_TO_PLAY`:
            return{...state, user_id: action.payload}

        case 'SET_LIABILITY_ACKNOWLEDGMENT':
            return {...state, liability_acknowledgment: action.payload}
    
        default: 
            return state;
    }
};

export default softballregistrationReducer