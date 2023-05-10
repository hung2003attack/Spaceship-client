import { Home, Exchange, CallVideo, MakingFriends } from '~/social_network/components/Header/importLayoutComponents';
interface Routes {
    home: string;
    exchange: string;
    callVideo: string;
    people: string;
    homeSlug: string;
    exchangeSlug: string;
    callVideoSlug: string;
}

const routes: Routes = {
    home: '/SN/',
    exchange: '/SN/exchange',
    callVideo: '/SN/callVideo',
    people: '/SN/people',
    homeSlug: '/SN/:slug',
    exchangeSlug: '/SN/exchange/:slug',
    callVideoSlug: '/SN/callVideo/:slug',
};
const components = {
    Home,
    Exchange,
    CallVideo,
    MakingFriends,
};

export { routes, components };
