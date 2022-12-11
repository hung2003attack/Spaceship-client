import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Cookies from 'universal-cookie';
import authHttpRequest from '~/restAPI/requestServers/authRequest/authRequest';
const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_AUTH,
});
const cookies = new Cookies();
class refreshToken {
    axiosJWTs(token: string) {
        console.log('token here', token);

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
                        const data = await authHttpRequest.refreshToken();
                        console.log(data, 'dataToke', number);

                        number++;
                        if (data) {
                            const newToken = 'Bearer ' + data.newAccessToken;
                            console.log(newToken);

                            cookies.set('tks', newToken, {
                                path: '/',
                                secure: false,
                                sameSite: 'strict',
                                expires: new Date(new Date().getTime() + 30 * 86409000),
                            });
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
