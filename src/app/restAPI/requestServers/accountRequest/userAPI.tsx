import axios, { AxiosError } from 'axios';
import refreshToken from '~/refreshToken/refreshToken';
import Cookies from 'universal-cookie';

export interface PropsParamsById {
    id?: string;
    fullName?: string;
    nickName?: string | null;
    status?: string | null;
    gender?: string;
    background?: string | null;
    avatar?: string | null;
    admin?: string;
    hobby?: string | null;
    strengths?: string | null;
    address?: string | null;
    skill?: string | null;
    birthDay?: string;
    occupation?: string | null;
    experience?: string | null;
    createdAt?: string | null;
    sn?: string;
    l?: string;
    w?: string;
    as?: string;
    more?: PropsParamsMores;
}
interface PropsParamsMores {
    position?: string;
    star?: string;
    love?: string;
    visit?: string;
    follow?: string;
    following?: string;
}
const cookies = new Cookies();
class HttpRequestUser {
    getById = async (token: string, id: string, params: PropsParamsById, mores: PropsParamsMores, first?: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/getById', {
                id: id,
                mores,
                first,
                params: params,
            });
            console.log(res, 'res');

            return res.data;
        } catch (error) {
            console.log(error);

            // console.log(error.reponsive.data);
        }
    };
    getByName = async (token: string, name: string, cateMore: string, searchMore: string, params: PropsParamsById) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/getByName', {
                name,
                cateMore,
                searchMore,
                params: params,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    setLg = async (token: string, id: string, lg: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/setLg', {
                id: id,
                lg: lg,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    setAs = async (token: string, as: number) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.patch('/SN/user/setAs', {
                as: as,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    getNewMes = async (token: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.get('/SN/user/getNewMes');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    delMessage = async (token: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.get('/SN/user/delMessage');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    changesOne = async (token: string, id: string, value: any, params: PropsParamsById) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.patch('/SN/user/changesOne', {
                params: {
                    id,
                    params,
                    value,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    follow = async (token: string, id: string, follow?: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.patch('/SN/user/follow', {
                params: {
                    id,
                    follow,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    Unfollow = async (token: string, id: string, unfollow: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.patch('/SN/user/Unfollow', {
                params: {
                    id,
                    unfollow,
                },
            });
            console.log(res, 'sd');

            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    getMore = async (token: string, offset: number, limit: number) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.get('/SN/user/getMore', {
                params: {
                    offset,
                    limit,
                },
            });
            console.log(res, 'sd');

            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    setHistory = async (
        token: string,
        data: { id: string; avatar: string; fullName: string; nickName: string; gender: number },
    ) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/setHistory', {
                params: {
                    data,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    getHistory = async (token: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.get('/SN/user/getHistory');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
}
export default new HttpRequestUser();
