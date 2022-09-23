import { Home, Exchange, CallVideo } from '~/social_network/components/Header/importLayoutComponents';
interface Routes {
    home: string;
    exchange: string;
    callVideo: string;
}

const routes: Routes = {
    home: '/SN/',
    exchange: '/SN/exchange',
    callVideo: '/SN/callVideo',
};
const components = {
    Home,
    Exchange,
    CallVideo,
};

export { routes, components };
