import configroutes from './headerRoute/configRoute';

export const routeheaders = [
    { path: configroutes.routes.home, Component: configroutes.components.Home },
    { path: configroutes.routes.exchange, Component: configroutes.components.Exchange },
    { path: configroutes.routes.callVideo, Component: configroutes.components.CallVideo },
];
