import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themeDark } from 'store/uiSlice';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from './theme';

export default function ThemeProvider({ children }) {
    const dispatch = useDispatch();
    const themeColor = useSelector(({ ui }) => ui.appSettings.theme);
    const isPreferredThemeCheckTriggered = useSelector(({ ui }) => ui.appSettings.isPreferredThemeCheckTriggered);

    useLayoutEffect(() => {
        if (
            isPreferredThemeCheckTriggered &&
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            dispatch(themeDark());
        }
    }, [dispatch, isPreferredThemeCheckTriggered]);

    return <MuiThemeProvider theme={theme(themeColor)}>{children}</MuiThemeProvider>;
}
