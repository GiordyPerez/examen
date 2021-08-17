import { API_URL } from '../assets/js/constants';

export const stopService = {
    getStop,
    insertStop,
    updateStop,
    updateStopState
};

function getStop(entity) {
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
    return fetch(`${API_URL}/Paradas/get`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}


function insertStop(body) {
    const https = require('https');
    const requestOptions = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Paradas/store`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateStop(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Paradas/update`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateStopState(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Paradas/updateEstado`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}