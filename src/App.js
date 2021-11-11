import React from 'react';
import { Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import AppRoute from 'utils/AppRoute';
import { ThemeProvider } from 'components/theme';

// Routes
import RoutesSwitch from 'utils/RoutesSwitch';

const store = configureStore();

const App = () => {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider>
                    <RoutesSwitch />
                </ThemeProvider>
            </Provider>
        </>
    );
};

export default App;
