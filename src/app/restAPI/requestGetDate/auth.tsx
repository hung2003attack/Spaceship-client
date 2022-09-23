import HttpRequest from '~/restAPI/requestServers/authHttpRequest';
import { userData, registerSuccessful, authSuccessful, authFailed, registerFailed } from '~/redux/reducer';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
class Authentication {
    login = async (phoneNumberEmail: string, password: string, dispatch: any) => {
        try {
            const user = await HttpRequest.postLogin('/login', {
                phoneNumberEmail,
                password,
            });

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
    logOut = async () => {
        try {
            await HttpRequest.postLogOut('/logout');
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
            const data = await HttpRequest.refreshToken('/refresh');
            return data;
        } catch (error) {
            console.log(error);
        }
    };
}
export default new Authentication();
