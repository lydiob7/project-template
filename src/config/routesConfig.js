const Home = () => <p>Home</p>;

const Error = () => <p>Error</p>;

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/home',
        redirectTo="/"
    },
    {
        component: Error
    }
];
