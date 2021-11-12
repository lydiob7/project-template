import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AppRoute from 'utils/AppRoute';
import { parsePath } from 'utils/helpers';

// Pages
import { routes } from 'config/routesConfig';

const RoutesSwitch = () => {
    return (
        <Switch>
            {routes.map(({ redirectTo, ...rest }, index) => {
                if (redirectTo)
                    return (
                        <AppRoute {...rest}>
                            <Redirect to={parsePath(redirectTo)} />
                        </AppRoute>
                    );
                return <AppRoute {...rest} />;
            })}
        </Switch>
    );
};

export default RoutesSwitch;
