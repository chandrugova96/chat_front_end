import axios from 'axios';

let customHeaders = {
    Accept: 'application/json'
};

export default axios.create({
    headers: customHeaders,
});