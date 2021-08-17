import { API_URL } from '../assets/js/constants';

export const cityService = {
    getCity,
    insertCity,
    updateCity,
    updateCityState
};

function getCity(entity) {
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
    return fetch(`${API_URL}/Ciudades/get`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}


function insertCity(body) {
    const https = require('https');
    const requestOptions = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Ciudades/store`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateCity(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Ciudades/update`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateCityState(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Ciudades/updateEstado`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}