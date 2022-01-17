import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    auth: null,
    token: null
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                ...{ auth: action.payload.user, token: action.payload.token, isLoggedIn: true },
            };
        case actionTypes.SIGNOUT_SUCCESS:
            return {
                ...state,
                ...{ auth: null, token: null, isLoggedIn: false },
            };
        default:
            return state;
    }
}

export default reducer;
