import React from 'react';
import { Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import AppRoute from 'utils/AppRoute';
import { ThemeProvider } from 'components/theme';

import Home from 'pages/home/Home';
import Error from 'pages/others/Error';

const store = configureStore();

const App = () => {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider>
                    <Switch>
                        <AppRoute exact path="/" component={Home} />
                        <AppRoute component={Error} />
                    </Switch>
                </ThemeProvider>
            </Provider>
        </>
    );
};

export default App;
