//* Import components here 👇👇

const Home = () => <p>Home</p>;
const PrivateComponent = () => <p>Private</p>;
const Error = () => <p>Error</p>;

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
        component: Error,
        layout: false,
        noLayoutFooter: true,
        noLayoutBtn: true
    }
];
