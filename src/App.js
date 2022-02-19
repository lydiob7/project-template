import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import { ThemeProvider } from 'components/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Auth } from './auth';

// Routes
import { RoutesSwitch } from 'utils';

const store = configureStore();

const App = () => {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider>
                    <CssBaseline>
                        <Auth>
                            <RoutesSwitch />
                        </Auth>
                    </CssBaseline>
                </ThemeProvider>
            </Provider>
        </>
    );
};

export default App;
