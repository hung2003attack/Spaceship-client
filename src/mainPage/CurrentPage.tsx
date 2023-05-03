import { socialnetwork } from 'src/dataMark/dateTextSocialNetWork';
import Socialnetwork from '~/social_network';
import Study from '~/study';

function currentPageL(currentPage: number, listPage: boolean) {
    if (listPage) {
        return currentPage === 1 ? (
            <Socialnetwork data={socialnetwork} />
        ) : currentPage === 2 ? (
            <Study />
        ) : (
            <div>hello personal</div>
        );
    }

    return <></>;
}
export default currentPageL;
