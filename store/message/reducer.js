import { actionTypes } from './action';

export const initState = {
    messages : [],
    contacts : []
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_MESSAGE_SUCCESS:
            return {
                ...state,
                ...{ messages: action.payload && action.payload.data ? action.payload.data  : [] },
            };
        case actionTypes.GET_CONTACTS_SUCCESS:
            return {
                ...state,
                ...{ contacts: action.payload && action.payload.data ? action.payload.data  : [] },
            };
        default:
            return state;
    }
}

export default reducer;
