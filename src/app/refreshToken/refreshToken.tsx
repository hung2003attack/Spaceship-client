import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Cookies from 'universal-cookie';
import authHttpRequest from '~/restAPI/requestServers/authRequest/authRequest';
axios.defaults.withCredentials = true;
const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_SPACESHIP,
});
const cookies = new Cookies();
class refreshToken {
    axiosJWTs(token: string) {
        console.log('token here', token);

        let i = 0;
        axiosJWT.interceptors.request.use(
            async (config) => {
                console.log('all right', i++);
                const date = new Date();
                const decodeToken: any = await jwt_decode(token);

                if (decodeToken.exp < date.getTime() / 1000 + 5) {
                    console.log(decodeToken.exp, date.getTime() / 1000 + 2, token, 'hhhh');
                    const data = await authHttpRequest.refreshToken();
                    if (data) {
                        const newToken = 'Bearer ' + data.newAccessToken;
                        cookies.set('tks', newToken, {
                            path: '/',
                            secure: false,
                            sameSite: 'strict',
                            expires: new Date(new Date().getTime() + 30 * 86409000),
                        });
                    }
                }
                return config;
            },
            (err) => {
                console.log('error Axios');

                return Promise.reject(err);
            },
        );
        return axiosJWT;
    }
}
export default new refreshToken();
