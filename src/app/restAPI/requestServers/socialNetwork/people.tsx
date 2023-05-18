import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { HttpRequest } from '../httpRequest';
import refreshToken from '~/refreshToken/refreshToken';
class PeopleRequest {
    getPeople = async (accessToken: string) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.get('/SN/people/getPeopleAll');
            console.log(res, 'getPeople');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    setFriend = async (accessToken: string, id: string, title: string) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.post('/SN/people/setFriend', {
                params: { id_friend: id, title: title },
            });
            return res.data;
        } catch (error) {
            console.log(error, 'add Friend');
        }
    };
    getfriendAll = async (accessToken: string) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.get('/SN/people/getFriendAll');
            return res.data;
        } catch (error) {
            console.log(error, 'get FriendAll');
        }
    };
}

export default new PeopleRequest();
