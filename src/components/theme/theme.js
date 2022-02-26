import { createTheme } from '@material-ui/core/styles';

export const theme = (color) =>
    createTheme({
        palette: {
            type: color,
            primary: {
                main: '#cd0370',
                dark: '#934b8e',
                contrastText: '#FFFFFF'
            },
            secondary: {
                main: '#00359f'
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
                        },
                        scrollbarWidth: 'thin'
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
                    },
                    '.fs-900': {
                        fontSize: '2rem'
                    },
                    '.fs-800': {
                        fontSize: '1.6rem'
                    },
                    '.fs-700': {
                        fontSize: '1.4rem'
                    },
                    '.fs-600': {
                        fontSize: '1.2rem'
                    },
                    '.fw-700': {
                        fontWeight: '700'
                    },
                    '.fw-600': {
                        fontWeight: '600'
                    },
                    '.fw-500': {
                        fontWeight: '500'
                    },
                    '.fw-400': {
                        fontWeight: '400'
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
