import refreshToken from '~/refreshToken/refreshToken';
import { HttpRequest } from '../httpRequest';

class SearchAPI {
    user = async (id: string, accessToken: string) => {
        try {
            const axiosJWT = refreshToken.axiosJWTs(accessToken);
            const path = '/SN/profile';
            const res = await axiosJWT.post(path, { params: { id } });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
}
export default new SearchAPI();
