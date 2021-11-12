import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: red
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        }
    }
});

const Button = ({ children, color, variant, ...rest }) => {
    const customColor = color === 'primary' || color === 'secondary' ? color : 'primary';
    const customVariant = variant ? variant : 'contained';

    if (color === 'danger')
        return (
            <ThemeProvider theme={theme}>
                <MuiButton variant={customVariant} color={customColor} {...rest}>
                    {children}
                </MuiButton>
            </ThemeProvider>
        );

    return (
        <MuiButton variant={customVariant} color={customColor} {...rest}>
            {children}
        </MuiButton>
    );
};

export default Button;
