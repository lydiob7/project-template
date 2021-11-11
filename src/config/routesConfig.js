//* Import components here 👇👇
import Mantainance from 'pages/others/Mantainance'
import Error from 'pages/others/Error'
import Home from 'pages/home/Home'

import { mantainancePath } from 'utils/helpers';

const PrivateComponent = () => <p>Private</p>;

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/home',
        redirectTo='/'
    },
    {
        path: '/private-route',
        component: PrivateComponent,
        privateRoute: true,
        redirectRoute: '/public-route',
        footer: false,
        scrollBtn: false
    },
    {
        path: mantainancePath,
        component: Mantainance,
        layout: false,
        noLayoutFooter: true,
    },
    {
        component: Error,
        layout: false,
        noLayoutFooter: true,
        noLayoutBtn: true
    }
];
