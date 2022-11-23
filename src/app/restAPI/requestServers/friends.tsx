import { Request } from './httpRequest';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

class HttpRequest {
    getFriend = async (path: string) => {
        try {
            const data = await Request.get(path);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
}

export default new HttpRequest();
