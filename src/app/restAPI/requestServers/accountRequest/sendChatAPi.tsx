import refreshToken from '~/refreshToken/refreshToken';

class SendChat {
    send = async (token: string, formData: any) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.post('/SN/sendChat/send', formData);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    getRoom = async (token: string, limit: number, offset: number) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.get('/SN/sendChat/getRoom', { params: { limit, offset } });
            console.log(res, 'get Room2');

            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
}
export default new SendChat();
