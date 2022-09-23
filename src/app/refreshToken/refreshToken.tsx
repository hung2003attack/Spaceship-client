import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { userData } from '~/redux/reducer';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';

import Authentication from '~/restAPI/requestGetDate/auth';

const axiosJWT = axios.create();
class refreshToken {
    axiosJWTs(currentUser: any, dispatch: Dispatch<AnyAction>) {
        console.log({ ...currentUser.user }, 'okd');
        let number = 1;

        axiosJWT.interceptors.request.use(
            async (config: any) => {
                const date = new Date();
                const decodeToken: any = jwt_decode(currentUser?.user.accessToken);

                if (decodeToken.exp < date.getTime() / 1000 + 5 && number === 1) {
                    console.log(decodeToken.exp, date.getTime() / 1000 + 5, currentUser?.user.accessToken);
                    if (number === 1) {
                        const data = await Authentication.refreshToken();
                        console.log(data, 'data');
                        number++;
                        if (data) {
                            console.log(data);

                            const user = {
                                ...currentUser?.user,
                                accessToken: data.newAccessToken,
                            };

                            dispatch(userData({ user: user }));
                            console.log(config.headers.notcall);
                            config.headers.notcall = 'Bearer ' + data.newAccessToken;
                            console.log(config.headers.notcall, config);
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
