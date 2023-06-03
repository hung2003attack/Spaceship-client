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
}
const cookies = new Cookies();
class HttpRequestUser {
    getById = async (token: string, id: string, params: PropsParamsById) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/getById', {
                id: id,
                params: params,
            });

            return res.data;
        } catch (error) {
            console.log(error);

            // console.log(error.reponsive.data);
        }
    };
    getByName = async (token: string, name: string, params: PropsParamsById) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/getByName', {
                name: name,
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
}
export default new HttpRequestUser();
