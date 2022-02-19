import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LayoutDefault, NoLayout } from 'layouts';

import { defaultRedirects } from 'config';

const AppRoute = ({
    component: Component,
    footer = true,
    layout = true,
    noLayoutFooter = false,
    noLayoutBtn = false,
    privateRoute = false,
    scrollBtn = false,
    ...componentProps
}) => {
    const authenticated = useSelector(({ auth }) => auth.user.authenticated);

    if (!Component) return null;

    return (
        <>
            {privateRoute && !authenticated ? (
                <Redirect to={defaultRedirects.notAuthenticated} />
            ) : (
                <>
                    {layout ? (
                        <LayoutDefault footer={footer} scrollBtn={scrollBtn}>
                            <Component {...componentProps} />
                        </LayoutDefault>
                    ) : (
                        <NoLayout footer={noLayoutFooter} scrollBtn={noLayoutBtn}>
                            <Component {...componentProps} />
                        </NoLayout>
                    )}
                </>
            )}
        </>
    );
};

export default AppRoute;
