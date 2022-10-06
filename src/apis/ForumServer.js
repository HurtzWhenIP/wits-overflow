import axios from 'axios';
const BASE_URL = 'http://34.72.247.6/src/';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});