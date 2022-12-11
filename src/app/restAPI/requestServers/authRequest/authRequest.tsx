import { AxiosError } from 'axios';
import { CookieSetOptions } from 'universal-cookie/cjs/types';
import refreshToken from '~/refreshToken/refreshToken';
import { HttpRequest } from '../httpRequest';

class AuthRequest {
    postLogin = async (
        params: { nameAccount: string; password: string },
        setCookies: (name: 'tks' | 'k_user', value: any, options?: CookieSetOptions | undefined) => void,
    ) => {
        try {
            const reponse = await HttpRequest.post('login', { params });
            const { id, accessToken } = reponse.data.user;
            if (id && accessToken) {
                const token = 'Bearer ' + accessToken;
                setCookies('tks', token, {
                    path: '/',
                    secure: false,
                    sameSite: 'strict',
                    expires: new Date(new Date().getTime() + 30 * 86409000),
                });
                delete reponse.data?.user.accessToken;
                setCookies('k_user', id, {
                    path: '/',
                    secure: false,
                    sameSite: 'strict',
                    expires: new Date(new Date().getTime() + 30 * 86409000),
                });
            }
            return reponse.data;
        } catch (error) {
            console.log('login', error);
        }
    };
    postSendOTP = async (params: { phoneMail: string | number }) => {
        try {
            const path = 'otp/send';
            const response = await HttpRequest.post(path, { params });
            return response;
        } catch (error) {
            console.log('sendOTP', error);
        }
    };
    postVerifyOTP = async (params: { phoneMail: string; otp: string }) => {
        try {
            const path = 'otp/verify';
            const res = await HttpRequest.post(path, { params });
            console.log('rés', res);

            return res;
        } catch (error) {
            console.log('sendOTP', error);
        }
    };
    postRegister = async (params: {
        name: string;
        phoneMail: string | Number;
        password: string;
        gender: number | null;
        date: string;
    }) => {
        try {
            const reponse = await HttpRequest.post('register', { params });
            return reponse?.data;
        } catch (error) {
            console.log('register', error);
        }
    };

    postLogOut = async (
        accessToken: string,
        k_user: string,
        removeCookie: (name: 'tks' | 'k_user', options?: CookieSetOptions | undefined) => void,
    ) => {
        console.log(accessToken, '123');

        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const data: any = await axiosJWTss.post('logout', {
                params: {
                    id: k_user,
                },
                headers: {
                    notcall: 'Bearer ' + accessToken,
                },
            });
            const { status } = data.data;
            if (status === 1 && data.status === 200) {
                removeCookie('tks');
                localStorage.clear();
            }
        } catch (error) {
            console.log(error);
            const err: any = error as AxiosError;
            const errStatus = err.response?.data;
            if (errStatus) {
                if (errStatus.status === 0) {
                    return { status: errStatus.status, message: 'You does not Allow' };
                }
            }
        }
    };
    refreshToken = async () => {
        try {
            const res = await HttpRequest.post('refresh', {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error, 'refresh');
        }
    };
}
export default new AuthRequest();
