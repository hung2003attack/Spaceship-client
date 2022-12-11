import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { HttpRequest } from './httpRequest';
class FriendRequest {
    getFriend = async (path: string) => {
        try {
            const data = await HttpRequest.get(path);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
}

export default new FriendRequest();
