import { API_URL } from '../assets/js/constants';

export const busService = {
    getBus,
    insertBus,
    updateBus,
    updateBusState
};

function getBus(entity) {
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
    return fetch(`${API_URL}/Bus/get`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}


function insertBus(body) {
    const https = require('https');
    const requestOptions = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Bus/store`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateBus(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Bus/update`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateBusState(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Bus/updateEstado`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}