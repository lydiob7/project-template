import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AppRoute from 'utils/AppRoute';

// Pages
import { routes } from 'config/routesConfig';

const RoutesSwitch = () => {
    return (
        <Switch>
            {routes.map(({ redirectTo, ...rest }, index) => {
                if (redirectTo)
                    return (
                        <AppRoute {...rest}>
                            <Redirect to={redirectTo} />
                        </AppRoute>
                    );
                return <AppRoute {...rest} />;
            })}
        </Switch>
    );
};

export default RoutesSwitch;
