import { all, put, call, takeEvery } from 'redux-saga/effects';

import { actionTypes, getMessageSuccess, getContactsSuccess } from './action';

import MessageRepository from '../../repositories/MessageRepository';


function* getMessageSaga() {
    try {
        let data = yield call(MessageRepository.getMessage);
        yield put(getMessageSuccess(data));
    } catch (err) {
        yield put(getMessageSuccess(null));
    }
}

function* createSendMessageSaga({ payload }) {
    try {
        let data = yield call(MessageRepository.createSendMessage, payload);
        yield put(getMessageSuccess(data));
    } catch (err) {
        yield put(getMessageSuccess(null));
    }
}

function* getContactsSaga() {
    try {
        let data = yield call(MessageRepository.getContacts);
        yield put(getContactsSuccess(data));
    } catch (err) {
        yield put(getContactsSuccess(null));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_MESSAGE_REQUEST, getMessageSaga)]);
    yield all([takeEvery(actionTypes.CREATE_MESSAGE_REQUEST, createSendMessageSaga)]);
    yield all([takeEvery(actionTypes.GET_CONTACTS_REQUEST, getContactsSaga)]);
}
