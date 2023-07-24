import { HttpRequest } from '../httpRequest';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import refreshToken from '~/refreshToken/refreshToken';
import { CookieSetOptions } from 'universal-cookie';
import Cookies from 'universal-cookie';
import { setNewsStart } from '~/redux/storeSocial_network/home';
class HomeAPI {
    getPosts = async (accessToken: string, limit: number, offset: number, status: string) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.get('/SN/home/getPosts', {
                params: { limit, offset, status },
            });
            return res.data;
        } catch (error) {
            console.log(error);

            // if (errStatus?.status === 0) window.location.href = '/';
        }
    };
    setPost = async (accessToken: string, formData: any) => {
        try {
            console.log(formData);

            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.post('/SN/home/setPost', formData);
            return res.data;
        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error:', error);
            }

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
}

export default new HomeAPI();
