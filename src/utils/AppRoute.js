import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parsePath } from './helpers';

const AppRoute = ({
    path,
    component: Component,
    layout: Layout,
    privateRoute = false,
    redirectRoute = '/',
    ...rest
}) => {
    const authenticated = useSelector(({ auth }) => auth.authenticated);

    Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;

    if (privateRoute && !authenticated) return <Redirect to={parsePath(redirectRoute)} />;

    return (
        <Route
            path={parsePath(path)}
            {...rest}
            render={(props) => (
                <>
                    <Layout>
                        <Component {...props} />
                    </Layout>
                </>
            )}
        />
    );
};

export default AppRoute;
