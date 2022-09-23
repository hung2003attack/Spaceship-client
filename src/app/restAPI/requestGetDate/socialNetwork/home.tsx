import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import httpRequest from '~/restAPI/requestServers/socialNetwork/home';
import { getNewsFailed, getNewsStart, getNewsCurrent } from '~/redux/storeSocial_network/home';
import { AxiosInstance } from 'axios';
class httpRequestHome {
    news = async (accessToken: string, dispatch: Dispatch<AnyAction>, axiosJWT: AxiosInstance) => {
        console.log(accessToken);

        dispatch(getNewsStart());

        try {
            const res = await axiosJWT.get('/SN/', {
                baseURL: process.env.REACT_APP_AUTH,
                headers: { notcall: 'Bearer ' + accessToken },
            });
            console.log(res, 'res Home');

            dispatch(getNewsCurrent(res.data));
        } catch (error) {
            console.log(error);

            dispatch(getNewsFailed());
        }
    };
}

export default new httpRequestHome();
