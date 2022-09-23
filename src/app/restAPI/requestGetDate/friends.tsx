import HttpRequest from '~/restAPI/requestServers/friends';
class GetFriend {
    friend = async () => {
        try {
            const data = await HttpRequest.getFriend('/');
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
}
export default new GetFriend();
