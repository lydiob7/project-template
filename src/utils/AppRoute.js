import React from 'react';
import { Route } from 'react-router-dom';
import { parsePath } from './helpers';

const AppRoute = ({ path, component: Component, layout: Layout, ...rest }) => {
    Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;

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
