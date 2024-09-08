//registrationTypes will be an array of objects of the form:
// {id: 1, type: Individual}
const registrationTypesReducer = (state = [], action) => {
    // console.log('registrationTypesReducer is updating state');
    switch (action.type) {
        case 'SET_REGISTRATION_TYPES':
            return action.payload;

        default:
            return state;
    }
}

// registrationTypes will be on the redux state at:
// state.registrationTypes
export default registrationTypesReducer