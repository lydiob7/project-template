import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parsePath } from './helpers';
import LayoutDefault from 'layouts/LayoutDefault';
import NoLayout from 'layouts/NoLayout';
import { mantainancePath } from 'utils/helpers';

const AppRoute = ({
    path,
    component: Component,
    layout = true,
    footer = true,
    scrollBtn,
    noLayoutFooter,
    noLayoutBtn,
    privateRoute = false,
    redirectRoute = parsePath(),
    ...rest
}) => {
    const authenticated = useSelector(({ auth }) => auth.authenticated);
    const mantainanceMode = useSelector(({ ui }) => ui.mantainanceMode);

    if (mantainanceMode && path !== parsePath(mantainancePath)) return <Redirect to={parsePath(mantainancePath)} />;
    if (!mantainanceMode && path === parsePath(mantainancePath)) return <Redirect to={parsePath('/error')} />;
    if (privateRoute && !authenticated) return <Redirect to={parsePath(redirectRoute)} />;

    return (
        <Route
            path={path}
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
