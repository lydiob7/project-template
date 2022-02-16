import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { themeDark } from 'store/uiSlice';

export default function ThemeProvider({ children }) {
    const dispatch = useDispatch();
    const themeColor = useSelector(({ ui }) => ui.theme);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            dispatch(themeDark());
        }
    }, [dispatch]);

    return <MuiThemeProvider theme={theme(themeColor)}>{children}</MuiThemeProvider>;
}
