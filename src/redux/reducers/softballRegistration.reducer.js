//might not need this... I am going to try POST routes instead of storing
//data in a reducer. 
const softballregistrationReducer = (state = {}, action) => {
    switch (action.type) {
        case `SET_USER_REGISTERING_TO_PLAY`:
            return{...state, user_id: action.payload}

        case 'SET_LIABILITY_ACKNOWLEDGMENT':
            return {...state, liability_acknowledgment: action.payload}

    //     case 'SET_PLAYER_INFORMATION':
    //         return {...state, 
    //             name: action.payload.name, 
    //             email: action.payload.email, 
    //             phone_number: action.payload.phone_number, 
    //             birthdate: action.payload.birthdate
    //         }
    
        default: 
            return state;
    }
};

export default softballregistrationReducer