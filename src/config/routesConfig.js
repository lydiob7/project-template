//* Import components here 👇👇
import Mantainance from 'pages/others/Mantainance';
import Error from 'pages/others/Error';
import Home from 'pages/home/Home';

import { mantainancePath, parsePath } from 'utils/helpers';

const PrivateComponent = () => <p>Private</p>;

export const routes = [
    {
        path: parsePath('/'),
        component: Home,
        exact: true
    },
    {
        path: parsePath('/home'),
        redirectTo: '/',
        exact: true
    },
    {
        path: parsePath('/private-route'),
        component: PrivateComponent,
        privateRoute: true,
        redirectRoute: '/public-route',
        exact: true,
        footer: false,
        scrollBtn: false
    },
    {
        path: parsePath(mantainancePath),
        component: Mantainance,
        layout: false
    },
    {
        component: Error,
        layout: false,
        noLayoutFooter: true,
        noLayoutBtn: true
    }
];
