export const actionTypes = {
    SIGNIN_REQUEST: 'SIGNIN_REQUEST',
    SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
    SIGNOUT_REQUEST: 'SIGNOUT_REQUEST',
    SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS'
};

export function signin(payload) {
    return { type: actionTypes.SIGNIN_REQUEST, payload };
}

export function signinSuccess(payload) {
    return { type: actionTypes.SIGNIN_SUCCESS,payload };
}

export function signout(payload) {
    return { type: actionTypes.SIGNOUT_REQUEST, payload };
}

export function signoutSuccess() {
    return { type: actionTypes.SIGNOUT_SUCCESS };
}