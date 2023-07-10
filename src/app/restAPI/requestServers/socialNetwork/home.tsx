import { HttpRequest } from '../httpRequest';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import refreshToken from '~/refreshToken/refreshToken';
import { CookieSetOptions } from 'universal-cookie';
import Cookies from 'universal-cookie';
import { setNewsStart } from '~/redux/storeSocial_network/home';
class HttpRequestHome {
    setPost = async (accessToken: string, formData: any) => {
        try {
            console.log(formData);

            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.post('/SN/home/setPost', formData);
            return res.data;
        } catch (error) {
            console.log(error, 'dawfawfwa');
            const err: any = error as AxiosError;
            const errStatus = err.response?.data;
            console.log(errStatus);

            // if (errStatus?.status === 0) window.location.href = '/';
        }
    };
    news = async (accessToken: string, dispatch: Dispatch<AnyAction>) => {
        // dispatch(getNewsStart());
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.get('/SN/home', {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error, 'dawfawfwa');
            const err: any = error as AxiosError;
            const errStatus = err.response?.data;
            console.log(errStatus);

            // if (errStatus?.status === 0) window.location.href = '/';
        }
    };
    exp = async (accessToken: string, id_c: string[], newExpire: number | undefined) => {
        // dispatch(getNewsStart());
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.post('/SN/home/expireChunks', {
                params: {
                    id_c,
                    exp: newExpire,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error, 'dawfawfwa');
            const err: any = error as AxiosError;
            const errStatus = err.response?.data;
            console.log(errStatus);

            // if (errStatus?.status === 0) window.location.href = '/';
        }
    };
}

export default new HttpRequestHome();
