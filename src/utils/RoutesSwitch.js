import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';

import { AppRoute } from 'utils';

// Pages
import MantainancePage from 'pages/others/MantainancePage';
import { routes } from 'config';

const RoutesSwitch = () => {
    const mantainanceMode = useSelector(({ ui }) => ui.appSettings.mantainanceMode);

    return (
        <Switch>
            {mantainanceMode ? (
                <Route component={MantainancePage} />
            ) : (
                routes.map(({ component, exact, path, privateRoute, redirectTo, ...rest }, index) => {
                    if (redirectTo)
                        return (
                            <Route key={path + index} exact={exact} path={path}>
                                <Redirect to={{ pathname: redirectTo }} />
                            </Route>
                        );

                    return (
                        <Route exact={exact} path={path} key={path + index}>
                            <AppRoute component={component} path={path} privateRoute={privateRoute} {...rest} />
                        </Route>
                    );
                })
            )}
        </Switch>
    );
};

export default RoutesSwitch;
