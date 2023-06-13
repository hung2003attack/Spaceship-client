import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { HttpRequest } from '../httpRequest';
import refreshToken from '~/refreshToken/refreshToken';
class PeopleRequest {
    getPeople = async (accessToken: string, rl?: string) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.get(`/SN/people/getPeopleAll?rl=${rl}`);
            console.log(res, 'getPeople');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    setFriend = async (accessToken: string, id: string) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.post('/SN/people/setFriend', {
                params: { id_friend: id },
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
    delete = async (accessToken: string, id: string, kindOf?: string) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.post('/SN/people/deleteReq', { params: { id_req: id, kindOf: kindOf } });
            return res.data;
        } catch (error) {
            console.log(error, 'delete');
        }
    };
    setConfirm = async (accessToken: string, id: string, kindOf?: string, atInfor?: boolean) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(accessToken);
            const res = await axiosJWTss.patch('/SN/people/setConfirm', {
                params: { id_req: id, kindOf: kindOf, atInfor },
            });
            return res.data;
        } catch (error) {
            console.log(error, 'delete');
        }
    };
    getStrangers = async (token: string, limit: number, ids: string[]) => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(token);
            const res = await axiosJWTss.get('/SN/people/getStrangers', {
                params: {
                    limit,
                    ids,
                },
            });
            refreshToken.ejectInterceptor();
            return res.data;
        } catch (error) {
            console.log(error, 'get Strangers');
        }
    };
    getFriends = async (token: string, offset: number, limit: number, type: string = 'friends') => {
        try {
            const axiosJWTss = refreshToken.axiosJWTs(token);
            const res = await axiosJWTss.get('/SN/people/getFriends', {
                params: {
                    offset,
                    limit,
                    type,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error, 'get Strangers');
        }
    };
}

export default new PeopleRequest();
