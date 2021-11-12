import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
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
