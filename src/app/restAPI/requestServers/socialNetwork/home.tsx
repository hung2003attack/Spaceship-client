import { Request } from '../httpRequest';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { getNewsFailed, getNewsStart, getNewsCurrent } from '~/redux/storeSocial_network/home';
import { AxiosError } from 'axios';
import refreshToken from '~/refreshToken/refreshToken';
import { CookieSetOptions } from 'universal-cookie';
import Cookies from 'universal-cookie';
const co = new Cookies();
class HttpRequestHome {
    news = async (accessToken: string, dispatch: Dispatch<AnyAction>) => {
        const axiosJWTss = refreshToken.axiosJWTs(accessToken);
        dispatch(getNewsStart());
        try {
            const res = await axiosJWTss.get('/SN', {
                headers: { notcall: 'Bearer ' + accessToken },
            });
            console.log(res, 'res Home');
            dispatch(getNewsCurrent(res.data));
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
