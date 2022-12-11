import { Home, Exchange, CallVideo } from '~/social_network/components/Header/importLayoutComponents';
interface Routes {
    home: string;
    exchange: string;
    callVideo: string;
    homeSlug: string;
    exchangeSlug: string;
    callVideoSlug: string;
}

const routes: Routes = {
    home: '/SN/',
    exchange: '/SN/exchange',
    callVideo: '/SN/callVideo',
    homeSlug: '/SN/:slug',
    exchangeSlug: '/SN/exchange/:slug',
    callVideoSlug: '/SN/callVideo/:slug',
};
const components = {
    Home,
    Exchange,
    CallVideo,
};

export { routes, components };
