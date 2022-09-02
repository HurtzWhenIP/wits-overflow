import axios from 'axios';
const BASE_URL = 'http://34.175.29.208/';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});