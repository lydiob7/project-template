import { createTheme } from '@material-ui/core/styles';

export const theme = (color) =>
    createTheme({
        palette: {
            type: color,
            primary: {
                main: '#00e49d',
                dark: '#00b67c',
                contrastText: '#32474c'
            },
            secondary: {
                main: '#2a2c4d'
            },
            text: {
                primary: '#18233f'
            }
        },
        typography: {
            fontFamily: "'Barlow', sans-serif"
        },
        overrides: {
            MuiButton: {
                root: {
                    textTransform: 'none'
                }
            },
            MuiSvgIcon: {
                root: {
                    fontSize: '1.5rem'
                }
            }
        },
        props: {
            MuiButton: {
                disableRipple: true,
                disableFocusRipple: true,
                variant: 'contained',
                color: 'primary'
            }
        }
    });
