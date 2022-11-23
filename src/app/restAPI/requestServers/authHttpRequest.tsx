import { AxiosError } from 'axios';
import { CookieSetOptions } from 'universal-cookie/cjs/types';
import refreshToken from '~/refreshToken/refreshToken';
import { Request } from './httpRequest';

class HttpRequest {
    postLogin = async (
        params: { nameAccount: string; password: string },
        setCookies: (name: 'tks' | 'k_user', value: any, options?: CookieSetOptions | undefined) => void,
    ) => {
        try {
            const reponse = await Request.post('login', { params });
            if (reponse.data?.user.hasOwnProperty('id') && reponse.data?.user) {
                setCookies('tks', reponse.data.user?.accessToken, {
                    path: '/',
                    secure: false,
                    sameSite: 'strict',
                    expires: new Date(new Date().getTime() + 30 * 86409000),
                });
                delete reponse.data?.user.accessToken;
                setCookies('k_user', reponse.data.user?.id, {
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
            const response = await Request.post(path, { params });
            return response;
        } catch (error) {
            console.log('sendOTP', error);
        }
    };
    postVerifyOTP = async (params: { phoneMail: string; otp: string }) => {
        try {
            const path = 'otp/verify';
            const res = await Request.post(path, { params });
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
            const reponse = await Request.post('register', { params });
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
        const axiosJWTss = refreshToken.axiosJWTs(accessToken);
        try {
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
            const res = await Request.post('refresh', {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error, 'refresh');
        }
    };
    getUser = async (params: { phoneMail: string | number }) => {
        try {
            const res = await Request.post('account/get', {
                params,
            });
            return res;
        } catch (error) {
            console.log('getUser', error);
        }
    };
}
export default new HttpRequest();
