import jsonwebtoken from 'jsonwebtoken';
import { jwtSecretKey } from '../config';

export function tokenVerify(auth) {
    var decoded = false;
    if (auth && auth.token) {
        try {
            decoded = jsonwebtoken.verify(auth.token, jwtSecretKey);
        } catch (e) {
            decoded = false;
        }
    }
    return decoded;
}

export function authHeader() {
    let local = JSON.parse(localStorage.getItem('persist:doodleblue'));
    let localAuth = local && local.auth ? JSON.parse(local.auth) : {};
    if (localAuth && localAuth.token) {
        return { 'authorization': `Bearer ${localAuth.token}` };
    } else {
        return {};
    }
}

export function getQuery() {
    let urlQuery = typeof window !== 'undefined' ? window.location.search.split("?")[1] : null;
    let query = {};
    if (urlQuery) {
        if (urlQuery.includes('&')) {
            let params = urlQuery.split('&');
            for (let i = 0; i < params.length; i++) {
                query[params[i].split('=')[0]] = params[i].split('=')[1];
            }
        } else {
            query[urlQuery.split('=')[0]] = urlQuery.split('=')[1];
        }
    }
    return query;
}