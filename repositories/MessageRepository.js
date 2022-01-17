import Repository from './Repository';
import { baseUrl } from '../config';
import { authHeader } from '../helper/auth';

class MessageRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async createSendMessage(payload) {
        const reponse = await Repository.post(`${baseUrl}/message`, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getMessage(payload) {
        const reponse = await Repository.get(`${baseUrl}/message`, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getContacts() {
        const reponse = await Repository.get(`${baseUrl}/contacts`,{ headers: authHeader() })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

}

export default new MessageRepository();
