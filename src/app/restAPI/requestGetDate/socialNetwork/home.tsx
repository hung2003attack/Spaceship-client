import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import httpRequest from '~/restAPI/requestServers/socialNetwork/home';
import { getNewsFailed, getNewsStart, getNewsCurrent } from '~/redux/storeSocial_network/home';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { authFailed } from '~/redux/authenRD';
class httpRequestHome {
    news = async (accessToken: string, dispatch: Dispatch<AnyAction>, axiosJWTss: AxiosInstance) => {
        console.log(accessToken, 'loo');

        dispatch(getNewsStart());

        try {
            const res = await axiosJWTss.get('/SN', {
                headers: { notcall: 'Bearer ' + accessToken },
            });
            console.log(res, 'res Home');
            dispatch(getNewsCurrent(res.data));
        } catch (error) {
            console.log(error);

            const err: any = error as AxiosError
            const errStatus = err.response?.data
            if (errStatus) {
                if (errStatus.status === 0) {
                    dispatch(getNewsFailed());
                    dispatch(authFailed())
                }
            }
        }
    };
}

export default new httpRequestHome();


