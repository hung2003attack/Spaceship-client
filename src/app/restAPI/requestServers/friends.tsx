import { Request } from './httpRequest';
class HttpRequest {
    getFriend = async (path: string) => {
        try {
            const data = await Request.get(path);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
}

export default new HttpRequest();
