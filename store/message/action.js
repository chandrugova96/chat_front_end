export const actionTypes = {
    CREATE_MESSAGE_REQUEST: 'CREATE_MESSAGE_REQUEST',
    CREATE_MESSAGE_SUCCESS: 'CREATE_MESSAGE_SUCCESS',
    GET_MESSAGE_REQUEST: 'GET_MESSAGE_REQUEST',
    GET_MESSAGE_SUCCESS: 'GET_MESSAGE_SUCCESS',
    GET_CONTACTS_REQUEST: 'GET_CONTACTS_REQUEST',
    GET_CONTACTS_SUCCESS: 'GET_CONTACTS_SUCCESS'
};

export function getMessage() {
    return { type: actionTypes.GET_MESSAGE_REQUEST };
}

export function getMessageSuccess(payload) {
    return { type: actionTypes.GET_MESSAGE_SUCCESS, payload };
}

export function createSendMessage(payload) {
    return { type: actionTypes.CREATE_MESSAGE_REQUEST, payload };
}

export function createSendMessageSuccess(payload) {
    return { type: actionTypes.CREATE_MESSAGE_SUCCESS, payload };
}

export function getContacts() {
    return { type: actionTypes.GET_CONTACTS_REQUEST };
}

export function getContactsSuccess(payload) {
    return { type: actionTypes.GET_CONTACTS_SUCCESS, payload };
}