import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AppRoute from 'utils/AppRoute';

// Pages
import { routes } from 'config/routesConfig';

const RoutesSwitch = () => {
    return (
        <Switch>
            {routes.map((route, index) => {
                if (route.redirectTo)
                    return (
                        <AppRoute path={route.path} exact={route.exact}>
                            <Redirect to={route.redirectTo} />
                        </AppRoute>
                    );
                return <AppRoute exact={route.exact} path={route.path} component={route.component} />;
            })}
        </Switch>
    );
};

export default RoutesSwitch;
