// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rateengine.ship.cars/v2/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    params: {
        token: '5cbe12fb62f4941267d623499a2a4fd5948fd3ef'
    }
});

export default api;
