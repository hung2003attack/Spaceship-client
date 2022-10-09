import HttpRequest from '~/restAPI/requestServers/authHttpRequest';
import Cookies from 'universal-cookie';
import { userData, registerSuccessful, authSuccessful, authFailed, registerFailed, logOutSuccess } from '~/redux/authenRD';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
const cookies = new Cookies();

class Authentication {
    login = async (phoneNumberEmail: string, password: string, dispatch: any) => {
        try {
            const user = await HttpRequest.postLogin('login/', {
                phoneNumberEmail,
                password,
            });
            console.log(user);

            if (user?.user.hasOwnProperty('id') && user?.user) {
                dispatch(authSuccessful());
                dispatch(userData(user));
            } else {
                dispatch(authFailed());
                dispatch(userData(user));

            }


            return user;
        } catch (err) {
            dispatch(authFailed());
        }
    };
    logOut = async (accessToken: string, dispatch: Dispatch<AnyAction>, axiosJWTss: AxiosInstance,) => {
        try {
            console.log('dfw', accessToken);

            const data = await HttpRequest.postLogOut('/logout', accessToken, axiosJWTss);
            console.log(data, '33');
            if (data?.status === 1) {
                dispatch(logOutSuccess());
                localStorage.clear();


            }
        } catch (error) {
            console.log(error);
        }
    };
    register = async (
        valueUserName: string,
        valuePhoneNumberEmail: string,
        valuePassword: string,
        valueGender: number | null,
        valueDate: string,
        dispatch: Dispatch<AnyAction>,
    ) => {
        try {
            await HttpRequest.postRegister('/register', {
                params: {
                    fullName: valueUserName,
                    phoneNumberEmail: valuePhoneNumberEmail,
                    password: valuePassword,
                    gender: valueGender,
                    birthDate: valueDate,
                },
            });

            dispatch(registerSuccessful());
        } catch (error) {
            dispatch(registerFailed());
        }
    };
    refreshToken = async () => {
        try {
            const data = await HttpRequest.refreshToken('refresh/');
            return data;
        } catch (error) {
            console.log(error);
        }
    };
}
export default new Authentication();
