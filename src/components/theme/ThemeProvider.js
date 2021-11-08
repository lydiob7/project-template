import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

export default function ThemeProvider({ children }) {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
