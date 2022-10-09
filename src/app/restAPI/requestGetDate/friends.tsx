import { authFailed } from '~/redux/authenRD';
import HttpRequest from '~/restAPI/requestServers/friends';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

class GetFriend {
    friend = async (dispatch: Dispatch<AnyAction>) => {
        try {
            const data = await HttpRequest.getFriend('/', dispatch);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
}
export default new GetFriend();
