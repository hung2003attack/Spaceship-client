import * as httpRequest from '~/restAPI/requestServers/socialNetwork/searchHttpRequest';

export const search = async (q: string, type = 'less') => {
    try {
        const res = await httpRequest.get('/users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log('error');
    }
};
