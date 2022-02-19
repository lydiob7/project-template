import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { defaultRedirects } from 'config/routesConfig';
import { parsePath } from './helpers';

const MainRouteRedirect = ({ history }) => {
    const role = useSelector(({ auth }) => auth.user?.data?.role);

    useEffect(() => {
        history.push(parsePath(defaultRedirects[role] || defaultRedirects.default));
    }, [history, role]);

    return null;
};

export default withRouter(MainRouteRedirect);
