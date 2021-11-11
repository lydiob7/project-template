import { useSelector } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

export default function ThemeProvider({ children }) {
    const themeColor = useSelector(({ ui }) => ui.theme);

    return <MuiThemeProvider theme={theme(themeColor)}>{children}</MuiThemeProvider>;
}
