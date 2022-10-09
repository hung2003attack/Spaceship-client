import { Request } from './httpRequest';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { authFailed } from '~/redux/authenRD';

class HttpRequest {
    getFriend = async (path: string, dispatch: Dispatch<AnyAction>) => {
        try {
            const data = await Request.get(path);
            console.log(data);
        } catch (error) {
            console.log(error);
            dispatch(authFailed());

        }
    };
}

export default new HttpRequest();
