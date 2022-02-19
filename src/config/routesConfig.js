//* Import components here 👇👇
import MantainancePage from 'pages/others/MantainancePage';
import ErrorPage from 'pages/others/ErrorPage';
import HomePage from 'pages/home/HomePage';
import LandingPage from 'pages/others/LandingPage';
import ProfilePage from 'pages/account/ProfilePage';
import SettingsPage from 'pages/account/SettingsPage';
import TermsAndConditions from 'pages/others/TermsAndConditions';
import PrivacyPolicy from 'pages/others/PrivacyPolicy';

import { mantainancePath, parsePath } from 'utils/helpers';
import authRoles from 'auth/authRoles';
import { MainRouteRedirect } from 'utils';

const PrivateComponent = () => <p>Private</p>;

export const defaultRedirects = {
    notAuthenticated: '/login',
    [authRoles.admin]: '/profile',
    [authRoles.user]: '/home',
    [authRoles.onlyGuest]: '/profile',
    default: '/home'
};

export const routes = [
    {
        path: parsePath('/'),
        component: MainRouteRedirect,
        exact: true
    },
    {
        path: parsePath('/home'),
        component: HomePage,
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
        component: ProfilePage,
        exact: true
    },
    {
        path: parsePath('/settings'),
        component: SettingsPage,
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
        component: MantainancePage,
        layout: false
    },
    {
        component: ErrorPage,
        layout: false,
        noLayoutFooter: true,
        noLayoutBtn: true
    }
];
