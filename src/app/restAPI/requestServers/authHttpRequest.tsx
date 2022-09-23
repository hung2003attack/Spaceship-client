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
            console.log('re', reponse);
            return reponse;
        } catch (error) {
            console.log('register', error);
        }
    };
    postLogOut = async (path: string) => {
        try {
            await Request.post(path);
        } catch (error) {
            console.log('logout', error);
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
