import React from 'react';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button as MuiButton } from '@material-ui/core';

const colorOptions = {
    danger: '#f44336',
    default: '#94bed9',
    primaryDark: '#94bed9'
};

const customTheme = (color) =>
    createTheme({
        palette: {
            primary: { main: colorOptions[color] || colorOptions['default'] }
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

    if (color === 'danger' || color === 'primaryDark')
        return (
            <ThemeProvider theme={customTheme(color)}>
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
