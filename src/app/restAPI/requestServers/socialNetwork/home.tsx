import { Request } from '../httpRequest';
class httpRequest {
    get = async (path: string, options = {}) => {
        const reponse = await Request.get(path, options);
        console.log(reponse, 'here');

        return reponse.data;
    };
}
export default new httpRequest();
