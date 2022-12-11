import { HttpRequest } from '../httpRequest';

class AccountRequest {
    get = async (params: { phoneMail: string | number }) => {
        try {
            const res = await HttpRequest.post('account/get', {
                params,
            });
            return { status: res.status, data: res.data };
        } catch (error) {
            console.log('getUser', error);
        }
    };
    changePassword = async (params: { id: string; password: string }) => {
        try {
            const res = await HttpRequest.post('account/changePassword', {
                params,
            });
            return { status: res.data.status, message: res.data.message };
        } catch (error) {
            console.log('changePassword', error);
        }
    };
}

export default new AccountRequest();
