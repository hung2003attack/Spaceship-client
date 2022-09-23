import { searchRequest } from '../httpRequest';
export const get = async (path: string, options = {}) => {
    const reponse = await searchRequest.get(path, options);
    return reponse.data;
};
