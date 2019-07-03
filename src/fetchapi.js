import { ACCESS_KEY } from "./constants";


export const get = (url, params) => {
    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return fetch(url + '?' + queryString, {
        method: 'GET',
        headers: {
            Authorization: 'Client-ID ' + ACCESS_KEY
        }
    }).then(response => response.json())
        .then(res => res)
        .catch(e => {
            console.log(e)
        })

}

export const post = (url, body) => {

    return fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Client-ID ' + ACCESS_KEY
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(res => res)
        .catch(e => {
            console.log(e)
        })

}