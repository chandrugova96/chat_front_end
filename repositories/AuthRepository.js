import Repository from './Repository';
import { baseUrl } from '../config';

class AuthRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async signup(payload) {
        const reponse = await Repository.post(`${baseUrl}/signup`, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async signin(payload) {
        const reponse = await Repository.post(`${baseUrl}/signin`, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async signout() {
        let local = JSON.parse(localStorage.getItem('persist:doodleblue'));
        let localAuth = local && local.auth ? JSON.parse(local.auth) : {};
        const reponse = await Repository.post(`${baseUrl}/signout?email=${localAuth.auth.email}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getUsers(payload) {
        const reponse = await Repository.get(`${baseUrl}/users?search=${payload}`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

}

export default new AuthRepository();
