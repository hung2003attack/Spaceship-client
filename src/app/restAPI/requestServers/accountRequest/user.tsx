import refreshToken from '~/refreshToken/refreshToken';
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
}
class HttpRequestUser {
    getById = async (token: string, id: string, params: PropsParamsById) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/getById', {
                id: id,
                params: params,
            });
            console.log(res, 'ressssss');

            return res.data;
        } catch (error) {
            console.log(error);
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
    update = async (token: string, id: string, lg: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/user/update', {
                id: id,
                lg: lg,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
}
export default new HttpRequestUser();
