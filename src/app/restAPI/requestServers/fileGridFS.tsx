import refreshToken from '~/refreshToken/refreshToken';

class GetFileGriFS {
    getFile = async (token: string, id_file: string) => {
        try {
            const Axios = refreshToken.axiosJWTs(token);
            const res = await Axios.get('/fileGridFS/getFile', { params: { id_file } });

            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
}
export default new GetFileGriFS();
