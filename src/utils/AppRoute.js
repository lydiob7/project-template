import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parsePath } from './helpers';
import LayoutDefault from 'layouts/LayoutDefault';
import NoLayout from 'layouts/NoLayout';

const AppRoute = ({
    path,
    component: Component,
    layout = true,
    footer = true,
    scrollBtn,
    noLayoutFooter,
    noLayoutBtn,
    privateRoute = false,
    redirectRoute = '/',
    ...rest
}) => {
    const authenticated = useSelector(({ auth }) => auth.authenticated);

    if (privateRoute && !authenticated) return <Redirect to={parsePath(redirectRoute)} />;

    return (
        <Route
            path={parsePath(path)}
            {...rest}
            render={(props) => (
                <>
                    {layout ? (
                        <LayoutDefault footer={footer} scrollBtn={scrollBtn}>
                            <Component {...props} />
                        </LayoutDefault>
                    ) : (
                        <NoLayout footer={noLayoutFooter} scrollBtn={noLayoutBtn}>
                            <Component {...props} />
                        </NoLayout>
                    )}
                </>
            )}
        />
    );
};

export default AppRoute;
