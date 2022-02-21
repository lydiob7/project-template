import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import { ThemeProvider } from 'components/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Auth } from './auth';

// Routes
import { LanguageCheck, RoutesSwitch } from 'utils';

const store = configureStore();

const App = () => {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider>
                    <CssBaseline>
                        <LanguageCheck>
                            <Auth>
                                <RoutesSwitch />
                            </Auth>
                        </LanguageCheck>
                    </CssBaseline>
                </ThemeProvider>
            </Provider>
        </>
    );
};

export default App;
