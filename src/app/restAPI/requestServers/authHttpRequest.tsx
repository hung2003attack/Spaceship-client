import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { logOutSuccess } from '~/redux/authenRD';
import { Request } from './httpRequest';

class HttpRequest {
    postLogin = async (path: string, options: { phoneNumberEmail: string; password: string }) => {
        try {
            const reponse = await Request.post(path, options);
            return reponse.data;
        } catch (error) {
            console.log('login', error);
        }
    };
    postRegister = async (
        path: string,
        options: {
            params: {
                fullName: string;
                phoneNumberEmail: string;
                password: string;
                gender: number | null;
                birthDate: string;
            };
        },
    ) => {
        try {
            const reponse = await Request.post(path, options);
            return reponse;
        } catch (error) {
            console.log('register', error);
        }
    };

    postLogOut = async (path: string, accessToken: string, axiosJWTss: AxiosInstance) => {
        console.log(accessToken);

        try {
            const data: any = await Request.post(path, {
                headers: {
                    notcall: 'Bearer ' + accessToken,
                }
            });
            return data.data?.result
        } catch (error) {
            console.log(error);
            const err: any = error as AxiosError
            const errStatus = err.response?.data
            if (errStatus) {
                if (errStatus.status === 0) {
                    return { status: errStatus.status, message: 'You does not Allow' }
                }
            }
        }
    };
    refreshToken = async (path: string) => {
        try {
            const res = await Request.post(path, {
                withCredentials: true,

            });
            return res.data;
        } catch (error) {

            console.log(error, 'refresh');
        }
    };
}
export default new HttpRequest();

