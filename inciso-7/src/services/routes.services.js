import { API_URL } from '../assets/js/constants';

export const routeService = {
    getRoute,
    insertRoute,
    updateRoute,
    updateRouteState
};

function getRoute(entity) {
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
    return fetch(`${API_URL}/Rutas/get`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}


function insertRoute(body) {
    const https = require('https');
    const requestOptions = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Rutas/store`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateRoute(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Rutas/update`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}

function updateRouteState(body) {
    const https = require('https');
    const requestOptions = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        responseType: 'json'
    };
    return fetch(`${API_URL}/Rutas/updateEstado`, requestOptions)
        .then(resp => {
            return resp.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        });
}