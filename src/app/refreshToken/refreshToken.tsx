import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { userData } from '~/redux/authenRD';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';

import Authentication from '~/restAPI/requestGetDate/auth';
import { CookieSetOptions } from 'universal-cookie';

const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_AUTH,
});

class refreshToken {
    axiosJWTs(token: string, currentUser: any, dispatch: Dispatch<AnyAction>, setCookie: any) {
        let number = 1;
        let i = 0;
        axiosJWT.interceptors.request.use(
            async (config: any) => {
                console.log('all right', i++);
                const date = new Date();
                const decodeToken: any = jwt_decode(token);
                if (decodeToken.exp < date.getTime() / 1000 + 5 && number === 1) {
                    console.log(decodeToken.exp, date.getTime() / 1000 + 5, token, 'hhhh');
                    if (number === 1) {
                        const data = await Authentication.refreshToken();
                        number++;
                        if (data) {
                            setCookie('tks', data.newAccessToken, {
                                path: '/',
                                secure: false,
                                sameSite: 'strict',
                                expires: new Date(new Date().getTime() + 30 * 86409000),
                            });
                            config.headers.notcall = 'Bearer ' + data.newAccessToken;
                        }
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            },
        );
        return axiosJWT;
    }
}
export default new refreshToken();
