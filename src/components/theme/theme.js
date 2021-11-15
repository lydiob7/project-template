import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export const theme = (color) =>
    createTheme({
        palette: {
            type: color,
            primary: {
                main: '#00E49D',
                dark: '#00B67C',
                contrastText: '#32474C'
            },
            secondary: {
                main: purple[600]
            },
            background: {
                default: color === 'light' ? '#FAFAFA' : '#202020',
                paper: color === 'light' ? '#FFFFFF' : '#303030'
            }
        },
        typography: {
            fontFamily: "'Barlow', sans-serif"
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '*': {
                        boxSizing: 'border-box',
                        '&::-webkit-scrollbar': {
                            width: '0.4em'
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            outline: 'none'
                        }
                    },
                    body: {
                        fontFamily: "'Barlow', sans-serif",
                        minHeight: '100vh',
                        margin: 0,
                        padding: 0,
                        overflowX: 'hidden'
                    },
                    '#root': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '100vh'
                    },
                    ul: {
                        padding: 0,
                        margin: 0,
                        listStyleType: 'none'
                    },
                    a: {
                        backgroundColor: 'transparent',
                        textDecoration: 'none !important'
                    }
                }
            },
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
