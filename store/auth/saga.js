import { all, put,call, takeEvery } from 'redux-saga/effects';

import { actionTypes, signoutSuccess } from './action';

import AuthRepository from '../../repositories/AuthRepository';


function* signoutSaga({ payload }) {
    try {
        yield call(AuthRepository.signout, payload);
        yield put(signoutSuccess());
    }  catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.SIGNOUT_REQUEST, signoutSaga)]);
}
