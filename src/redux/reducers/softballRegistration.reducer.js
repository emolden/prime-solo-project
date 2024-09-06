const softballregistrationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {...state, key: action.payload}
    
    default: 
        return state;
    }
};

export default softballregistrationReducer