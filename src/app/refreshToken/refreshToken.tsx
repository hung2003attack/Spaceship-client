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
    private isInterceptorAttached: boolean = false;
    private interceptor: any;
    axiosJWTs(token: string) {
        console.log('token here', token);

        let i = 0;
        if (!this.isInterceptorAttached) {
            this.interceptor = axiosJWT.interceptors.request.use(
                async (config) => {
                    console.log('all right', i++);
                    const date = new Date();
                    const decodeToken: any = await jwt_decode(token);

                    if (decodeToken.exp < date.getTime() / 1000 + 5) {
                        console.log(decodeToken.exp, date.getTime() / 1000 + 2, token, 'hhhh');
                        const data = await authHttpRequest.refreshToken();
                        console.log(data.newAccessToken, 'newAccessToken');

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
                    this.isInterceptorAttached = true;
                    return config;
                },
                (err) => {
                    console.log('error Axios');

                    return Promise.reject(err);
                },
            );
        }
        return axiosJWT;
    }
    ejectInterceptor() {
        // Gỡ bỏ interceptor nếu đã được gắn
        if (this.interceptor) {
            axiosJWT.interceptors.request.eject(this.interceptor);
            this.isInterceptorAttached = false;
        }
    }
}
export default new refreshToken();
