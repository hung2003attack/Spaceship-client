import axios from 'axios';
axios.defaults.withCredentials = true;
export const searchRequest = axios.create({
    baseURL: process.env.REACT_APP_NETWORK,
});

export const Request = axios.create({
    baseURL: process.env.REACT_APP_AUTH,
});
