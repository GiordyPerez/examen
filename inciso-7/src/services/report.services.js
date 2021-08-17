import { API_URL } from '../assets/js/constants';

export const busService = {
    getData
};

function getData(entity) {
    const https = require('https');
    const requestOptions = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(entity),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        //mode: 'no-cors', // no-cors,cors, *cors, same-origin,
        responseType: 'json'
    };
    return fetch(`${API_URL}/Report/get`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

