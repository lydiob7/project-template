//* Import components here 👇👇
import Mantainance from 'pages/others/Mantainance';
import Error from 'pages/others/Error';
import Home from 'pages/home/Home';
import LandingPage from 'pages/others/LandingPage';
import Profile from 'pages/account/Profile';
import Settings from 'pages/account/Settings';
import TermsAndConditions from 'pages/others/TermsAndConditions';
import PrivacyPolicy from 'pages/others/PrivacyPolicy';

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
        path: parsePath('/login'),
        component: LandingPage,
        form: 'login',
        exact: true
    },
    {
        path: parsePath('/register'),
        component: LandingPage,
        form: 'signup',
        exact: true
    },
    {
        path: parsePath('/forgot-password'),
        component: LandingPage,
        form: 'forgot-pwd',
        exact: true
    },
    {
        path: parsePath('/reset-confirmation'),
        component: LandingPage,
        form: 'mail-confirmation',
        exact: true
    },
    {
        path: parsePath('/profile'),
        component: Profile,
        exact: true
    },
    {
        path: parsePath('/settings'),
        component: Settings,
        exact: true
    },
    {
        path: parsePath('/terms&conditions'),
        component: TermsAndConditions,
        exact: true
    },
    {
        path: parsePath('/privacy-policy'),
        component: PrivacyPolicy,
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
