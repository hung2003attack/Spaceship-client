import axios from 'axios';
axios.defaults.withCredentials = true;
export const HttpRequest = axios.create({
    baseURL: process.env.REACT_APP_AUTH,
});
